
const envDev = process.env.ENVIRONMENT_DEV;
const envProduction = process.env.ENVIRONMENT_PRODUCTION;

const isDev = process.env.NODE_ENV === 'development';

let env: string | undefined;

export default function environment(){
    if (!env){
        env = isDev ? envDev : envProduction;
    }
    return env;
}