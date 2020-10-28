export default class Roll {
    public static Die(die: number = 20) : number {
        return Math.floor(Math.random() * die) + 1;
    }

    public static Dice(dice: Array<number>) : Array<number> {
        return dice.map(d => this.Die(d));
    }
}