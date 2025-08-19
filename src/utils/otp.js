export const OtpGenerator=()=>{
    let randomChar='A5T0GB0Y9MZ7K2P4O1Q3S22XT'
    let otp=''
    for(let i=0;i<6;i++)
    {
       otp+= randomChar[Math.floor(Math.random()*20)]
    }
    return otp
}