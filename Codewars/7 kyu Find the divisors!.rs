use num::integer::sqrt;
fn divisors(integer: u32) -> Result<Vec<u32>, String> {
    let divisors:Vec<u32>=(2..integer/2+1).filter(|x| integer%x==0).collect();
    match !divisors.is_empty(){
        true => Ok(divisors),
        _ => Err(format!("{} is prime",integer).to_string())
    }
}