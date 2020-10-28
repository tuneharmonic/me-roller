import Roll from '../utilities/Roll';

export interface NumberValue {
    Evaluate(): number[];
    toString(): string;
}

export class RawValue implements NumberValue {
    
    private value: number;

    constructor(value: number) {
        this.value = value;
    }
    
    public Evaluate(): number[] {
        return [ this.value ];
    }

    public toString(): string {
        return this.value.toString();
    }
}

export class DiceValue implements NumberValue {

    private numberOfDice: number;
    private faces: number;

    constructor(numberOfDice: number, faces: number) {
        this.numberOfDice = numberOfDice;
        this.faces = faces;
    }

    public Evaluate(): number[] {
        const dice = [];
        for (let i = 0; i < this.numberOfDice; i++) {
            dice.push(this.faces);
        }
        return Roll.Dice(dice);
    }

    public toString(): string {
        return (this.numberOfDice !== 1 ? this.numberOfDice.toString() : '') + 'd' + this.faces.toString();
    }
}

export class NumberValueGroup {
    public value: NumberValue;
    public positive: boolean;

    constructor(value: NumberValue, positive: boolean) {
        this.value = value;
        this.positive = positive;
    }

    public toString(): string {
        return (this.positive ? '+' : '-') + this.value.toString();
    }
}