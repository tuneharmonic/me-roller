import { DiceValue, NumberValue, NumberValueGroup, RawValue } from "./NumberValue";

export class DiceExpressionResult {
    public expression: string;
    public resolvedExpression: string;
    public result: number;

    constructor(expression: string, resolvedExpression: string, result: number) {
        this.expression = expression;
        this.resolvedExpression = resolvedExpression;
        this.result = result;
    }
}

export default class DiceExpression {
    private static diceWithOperatorExpression: RegExp = /([+-]?)(\d*)([dD]?)(\d+)/g;
    private static invalidCharacterExpression: RegExp = /([^+\-dD\d])/g;

    private expression: string = '';

    private clauses: Array<string> = [];
    private valueGroups: Array<NumberValueGroup> = [];

    public static Default: DiceExpression = new DiceExpression('d4');
    
    constructor(expression: string) {
        this.Evaluate(expression);
    }

    public static Parse(expression: string, handler?: (error: any) => void): DiceExpression | undefined {
        try {
            const newExpression = new DiceExpression(expression);
            return newExpression;
        } catch (error) {
            if (handler !== undefined) {
                handler(error);
            } else {
                console.error(error);
            }
            return undefined;
        }
    }

    public Calculate(): DiceExpressionResult {
        let firstGroup = true;
        let value: number = 0;
        let resolvedExpression: string = '';
        this.valueGroups.map(valueGroup => {
            if (!valueGroup.positive) {
                resolvedExpression += ' - ';
            } else {
                if (!firstGroup) {
                    resolvedExpression += ' + ';
                }
            }

            let groupValue: number = 0;
            var groupResults = valueGroup.value.Evaluate();
            resolvedExpression += '[ ';
            groupResults.map((groupResult, index) => {
                groupValue += groupResult;
                resolvedExpression += groupResult;
                if (index !== groupResults.length - 1) {
                    resolvedExpression += ', ';
                } else if (groupResults.length > 1) {
                    resolvedExpression += '= ' + groupValue;
                }
                return groupResult;
            });
            resolvedExpression += ' ]';
            
            if (valueGroup.positive) {
                value += groupValue;
            } else {
                value -= groupValue;
            }
            
            if (firstGroup) {
                firstGroup = false;
            }

            return valueGroup;
        });

        resolvedExpression += ' = ' + value;

        return new DiceExpressionResult(this.expression, resolvedExpression.trim(), value);
    }

    public toString() {
        return this.expression;
    }

    public PrettyString() {
        let prettyString = this.valueGroups.join('');

        if (this.valueGroups.length && this.valueGroups[0].positive) {
            prettyString = prettyString.substring(1);
        }

        return prettyString;
    }

    public Evaluate(expression: string) {

        let allErrors = [];
        let errors;
        while ((errors = DiceExpression.invalidCharacterExpression.exec(expression)) !== null) {
            allErrors.push(errors[0]);
        }
        if (allErrors.length) {
            console.log(allErrors);
            throw new Error('Invalid characters found: ' + allErrors);
        }

        let firstMatch = true;
        let match: RegExpExecArray | null;
        while ((match = DiceExpression.diceWithOperatorExpression.exec(expression)) !== null) {

            this.clauses.push(match[0]);    // full match

            // check for operator on additional clauses
            const operator = match[1];
            if (firstMatch) {
                firstMatch = false;
            }

            let positive: boolean = true;
            if (operator === '-') {
                positive = false;
            }

            // check if expression or constant
            let numberValue: NumberValue;
            const isDiceValue = match[3] !== ''; // if "d" is in the match
            if (isDiceValue) {
                const numberOfDice = match[2] ? Number.parseInt(match[2]) : 1;
                const faces = Number.parseInt(match[4]);

                numberValue = new DiceValue(numberOfDice, faces);
            } else {
                let valueString: string;
                // handle weird capture group bug
                if (match[2] !== null) {   // multiple digit constant is split into two groups
                    valueString = match[2] + match[4];
                } else {
                    valueString = match[4];
                }

                numberValue = new RawValue(Number.parseInt(valueString));
            }

            this.valueGroups.push(new NumberValueGroup(numberValue, positive));
        }

        this.expression = expression;
    }
}
