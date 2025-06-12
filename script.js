class Reaction{
    constructor(reactant1, reactant2, product1, product2, coeffR1, coeffR2, coeffP1, coeffP2){
        this.reactant1 = reactant1;
        this.reactant2 = reactant2;
        this.product1 = product1;
        this.product2 = product2;
        this.coeffR1 = coeffR1;
        this.coeffR2 = coeffR2;
        this.coeffP1 = coeffP1;
        this.coeffP2 = coeffP2;
    }

    toString(){
        let coeffR1Str="";
        let coeffR2Str="";
        let coeffP1Str="";
        let coeffP2Str="";

        {
            if(this.coeffR1 == 1){
                coeffR1Str = "";
            }else{
                coeffR1Str = this.coeffR1;
            }

            if(this.coeffR2 == 1){
                coeffR2Str = "";
            }else{
                coeffR2Str = this.coeffR2;
            }

            if(this.coeffP1 == 1){
                coeffP1Str = "";
            }else{
                coeffP1Str = this.coeffP1;
            }

            if(this.coeffP2 == 1){
                coeffP2Str = "";
            }else{
                coeffP2Str = this.coeffP2;
            }
        }

        return `${coeffR1Str}${this.reactant1} + ${coeffR2Str}${this.reactant2} --> ${coeffP1Str}${this.product1} + ${coeffP2Str}${this.product2}`;
    }
}

// ₂ ₄

let gasDict = {
    "Helium Gas": {
        mass: 4.00,
        reactions: null
    },
    "Hydrogen Gas": {
        mass: 2.02,
        reactions: {
            1: new Reaction("CH₄", "H₂O", "C", "H₂", 1, 1, 1, 2),
            2: new Reaction("Zn", "HCl", "ZnCl₂", "H₂", 1, 2, 1, 1),
            3: new Reaction("Li", "H₂O", "LiOH", "H₂", 1, 1, 1, 1),
            4: new Reaction("Ca", "H₂O", "Ca(OH)₂", "H₂", 1, 2, 1, 1)
        }
    }
    /*"Nitrogen Gas":{
        mass: 28.02,
        reactions: {
            1: new Reaction()
        }
    }*/
}

function randint(min, max){
    return Math.floor(Math.random()*(max-min)) + min;
}

function randdec(){
    let int = randint(1, 4)
    return Math.round((Math.random() + randint(0, 50))*(10**int))/10**int;
}

function run(){
    let index = randint(0, Object.keys(gasDict).length);
    let chosen = gasDict[Object.keys(gasDict)[index]];
    console.log(chosen.mass);
    let choice = randint(1, 3);
    if(choice==1){
        //combined gas law
        console.log("combined gas law");
    }else if(choice==2){
        //pv=nrt
        console.log("pv=nrt");
    }
}

run();