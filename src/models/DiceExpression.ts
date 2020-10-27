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
    private static invalidCharacterExpression: RegExp = /([^+\-dD\d])+([dD]{2,})+/g;

    private expression: string;

    private clauses: Array<string> = [];
    private valueGroups: Array<NumberValueGroup> = [];
    
    constructor(expression: string) {
        this.expression = expression;
        this.Evaluate();
    }

    public static Parse(expression: string, handler?: (error: any) => void): DiceExpression | undefined {
        try {
            return new DiceExpression(expression);
        } catch (error) {
            if (handler !== undefined) {
                handler(error);
            }
            console.error(error);
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

    private Evaluate() {
        if (!this.expression) {
            throw new Error('Expression must be provided');
        }

        let errors;
        if ((errors = DiceExpression.invalidCharacterExpression.exec(this.expression)) !== null && errors) {
            console.log(errors);
            throw new Error('Invalid characters found: ' + errors[0]);
        }

        if (this.expression.search(DiceExpression.diceWithOperatorExpression) === -1) {
            throw new Error('At least one value expression must be provided');
        }

        let firstMatch = true;
        let match: RegExpExecArray | null;
        while ((match = DiceExpression.diceWithOperatorExpression.exec(this.expression)) !== null) {
            this.clauses.push(match[0]);    // full match

            // check for operator on additional clauses
            const operator = match[1];
            if (firstMatch) {
                firstMatch = false;
            } else {
                if (!operator) {
                    throw new Error('Operator must be provided for additional clauses');
                }
            }

            let positive: boolean = true;
            if (operator === '-') {
                positive = false;
            }

            // check if expression or constant
            let numberValue: NumberValue;
            const isDiceValue = match[3] !== null; // if "d" is in the match
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
    }
}
