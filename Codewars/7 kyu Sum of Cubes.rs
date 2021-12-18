fn sum_cubes(n: u32) -> u32 {
    (1..=n).map(|x| x.pow(3)).sum()
}
