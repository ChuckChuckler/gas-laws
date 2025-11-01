const PSI_TO_ATM = 14.7;
const KPA_TO_ATM = 101.3;
const MMHG_TO_ATM = 760;
const ML_TO_L = 1000;

let GAS_CONSTANT = 0.0821;

class Reaction{
    constructor(reactant1, reactant2, product1, product2, coeffR1, coeffR2, coeffP1, coeffP2, massR1, massR2){
        this.reactant1 = reactant1;
        this.reactant2 = reactant2;
        this.product1 = product1;
        this.product2 = product2;
        this.coeffR1 = coeffR1;
        this.coeffR2 = coeffR2;
        this.coeffP1 = coeffP1;
        this.coeffP2 = coeffP2;
        this.massR1 = massR1;
        this.massR2 = massR2;
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

    calc(moles, sigfigs){
        let choice = randint(1, 3);
        let chosenReactant;
        let chosenCoeff;
        let chosenMass;

        if(choice==1){
            let reactantMass = Math.round(((moles*this.coeffR1)/this.coeffP2)*this.massR1*(10**sigfigs))/(10**sigfigs);
            return [this.reactant1, reactantMass, this.massR1, this.coeffR1];
        }else{
            let reactantMass = Math.round(((moles*this.coeffR2)/this.coeffP2)*this.massR2*(10**sigfigs))/(10**sigfigs);
            return [this.reactant2, reactantMass, this.massR2, this.coeffR2];
        }
    }

    calcWithExcess(moles, sigfigs){
        let choice = randint(1, 3);
        if(choice == 1){
            let limitingMass = Math.round(((moles*this.coeffR1)/this.coeffP2)*this.massR1*(10**sigfigs))/(10**sigfigs);
            let excessMass = randdec(((moles*this.coeffR2)/this.coeffP2)*this.massR2+1, ((moles*this.coeffR2)/this.coeffP2)*this.massR2+10);
            excessMass = Math.round(excessMass[0]*(10**excessMass[1]))/(10**excessMass[1]);
            return [[this.reactant1, limitingMass], [this.reactant2, excessMass]];
        }else{
            let limitingMass = Math.round(((moles*this.coeffR2)/this.coeffP2)*this.massR2*(10**sigfigs))/(10**sigfigs);
            let excessMass = randdec(((moles*this.coeffR1)/this.coeffR2)+1, ((moles*this.coeffR1)/this.coeffR2)+10);
            excessMass = Math.round(excessMass[0]*(10**excessMass[1]))/(10**excessMass[1]);
            return [[this.reactant1, limitingMass], [this.reactant2, excessMass]];
        }
    }
}

// ₂ ₄

let gasDict = {
    "Helium Gas": {
        formula: "He",
        mass: 4.00,
        reactions: null
    },
    "Hydrogen Gas": {
        formula: "H₂",
        mass: 2.02,
        reactions: {
            1: new Reaction("CH₄", "H₂O", "C", "H₂", 1, 1, 1, 2, 16.05, 18.02),
            2: new Reaction("Zn", "HCl", "ZnCl₂", "H₂", 1, 2, 1, 1, 65.39, 36.46),
            3: new Reaction("Li", "H₂O", "LiOH", "H₂", 2, 2, 2, 1, 6.94, 18.02),
            4: new Reaction("Ca", "H₂O", "Ca(OH)₂", "H₂", 1, 2, 1, 1, 40.08, 18.02)
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

function randdec(min, max){
    let int = randint(1, 4)
    return [Math.round((Math.random() + randint(min, max))*(10**int))/(10**int), int];
}

function run(){
    let index = randint(0, Object.keys(gasDict).length);   
    let chosen = gasDict[Object.keys(gasDict)[1]];
    let choice = randint(1, 2); //change to 3 outside of testing
    if(choice==1){
        //pv=nrt
        console.log("pv=nrt");
        //let choice = randint(2, 3); //change to 3 outside of testing
        let choice = 2;
        let P_ideal = randdec(1, 5);
        let decP = P_ideal[1];
        P_ideal = P_ideal[0];
        let V_ideal = randdec(1, 100);
        let decV = V_ideal[1];
        V_ideal = V_ideal[0];
        let T_ideal = randint(0, 500);

        let P=P_ideal;
        let V=V_ideal;
        let T=T_ideal;

        let pUnit = "atm";
        let vUnit = "L";
        let tUnit = "Kelvin";

        let pConversion = randint(1,5);
        if(pConversion==2){
            P=Math.round((P_ideal*PSI_TO_ATM)*(10**decP))/(10**decP);
            pUnit = "p.s.i";
        }else if(pConversion==3){
            P=Math.round((P_ideal*KPA_TO_ATM)*(10**decP))/(10**decP);
            pUnit = "kPa";
        }else if(pConversion==4){
            P=Math.round((P_ideal*MMHG_TO_ATM)*(10**decP))/(10**decP);
            pUnit = "mmHg";
        }

        let vConversion = randint(1, 3);
        if(vConversion==2){
            V=Math.round((V_ideal*ML_TO_L)*(10**decV))/(10**decV);
            vUnit = "mL";
        }

        let tConversion = randint(1, 3);
        if(tConversion==2){
            T=T_ideal-273;
            tUnit = "°C";
        }

        let sigfigs=100;
        if(P.toString().replaceAll("0", "").length < sigfigs){
            sigfigs=P.toString().length;
        }

        if(V.toString().replaceAll("0", "").length < sigfigs){
            sigfigs=V.toString().length;
        }

        if(T.toString().replaceAll("0", "").length < sigfigs){
            sigfigs=T.toString().length;
        }

        let nUnrounded = (P_ideal*V_ideal)/(GAS_CONSTANT*T_ideal);
        let n = Math.round(nUnrounded*(10**2))/(10**2);

        if(choice==1 || chosen.reactions==null){
            console.log(`${P} ${pUnit}, ${V} ${vUnit}, ${T} ${tUnit}`);
            let choice = randint(1, 3); //change to 3 outside of testing
            if(choice==1 || chosen.reactions==null){
                let mmass = Math.round((nUnrounded*chosen.mass)*(100))/100;
                console.log(`${mmass} grams of ${chosen.formula}`);
            }else{
                let reaction = chosen.reactions[randint(1, Object.keys(chosen.reactions).length+1)];
                console.log(reaction.toString());
                let calcResult = reaction.calc(nUnrounded, sigfigs);
                console.log(`${calcResult[1]} g of ${calcResult[0]} required`);
            }
        }else if(choice==2 && chosen.reactions!=null){
            //find V
            let choice = randint(2, 3);
            let reaction = chosen.reactions[randint(1, Object.keys(chosen.reactions).length+1)];
            console.log(reaction.toString());
            console.log(`${P} ${pUnit}, ${T} ${tUnit}`);
            if(choice==1){
                let calcResult = reaction.calc(nUnrounded, sigfigs);
                let V = (nUnrounded*(GAS_CONSTANT)*T_ideal)/P_ideal;
                //let vRounded = Math.round(V*(10**sigfigs))/(10**sigfigs)
                console.log(`${calcResult[1]} g of ${calcResult[0]}`);
                console.log(`${vRounded} L of ${chosen.formula}`);
            }else{
                //recalc V
                let calcResult = reaction.calcWithExcess(nUnrounded, sigfigs);
                let V = (nUnrounded*(GAS_CONSTANT)*T_ideal)/P_ideal;
                let vRounded = Math.round(V*(10**sigfigs))/(10**sigfigs)
                console.log(`${calcResult[0][1]} g of ${calcResult[0][0]}`);
                console.log(`${calcResult[1][1]} g of ${calcResult[1][0]}`);
                console.log(`${vRounded} L of ${chosen.formula}`);
            }
        }
    }else if(choice==2){
        //combined gas law
        console.log("combined gas law");
    }
}

run();