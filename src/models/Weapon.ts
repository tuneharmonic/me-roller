class Weapon {
    constructor(
        name: string,
        description: string,
        weaponType: string,
        damageDice: Array<number>,
        damageBonus: number,
        attackBonus: number,
        critRange: number,
        critMultiplier: number,
        rateOfFire: number,
        fireType: string,
        recoil: number) {
            this.name = name;
            this.description = description;
            this.weaponType = weaponType;
            this.damageDice = damageDice;
            this.damageBonus = damageBonus;
            this.attackBonus = attackBonus;
            this.critRange = critRange;
            this.critMultiplier = critMultiplier;
            this.rateOfFire = rateOfFire;
            this.fireType = fireType;
            this.recoil = recoil;
        }

    public name: string;
    public description: string;
    public weaponType: string;
    public damageDice: Array<number>;
    public damageBonus: number;
    public attackBonus: number;
    public critRange: number;
    public critMultiplier: number;
    public rateOfFire: number;
    public fireType: string;
    public recoil: number;
}

export default Weapon;