const validate = (input) => {
    let errors = {};

    if(!/^[a-z ,A-Z.'-]+$/.test(input.name)){
        errors.name = 'Name required'
    }
    if(!input.height){
        errors.height = "height is required"
    }
    if(!/^-?\d*(\.\d+)?$/.test(input.height)){
        errors.height = "height must be a number"
    }
    if(!input.weight){
        errors.weight = "Weight is required"
    }
    if(!/^-?\d*(\.\d+)?$/.test(input.weight)){
        errors.weight = "Weight must be a number"
    }
    if(!input.life_span){
        errors.life_span = "Years required"
    }
    if(!/^-?\d*(\.\d+)?$/.test(input.life_span)){
        errors.life_span = "Years must be a number"
    }
    return errors;
}

export default validate; 