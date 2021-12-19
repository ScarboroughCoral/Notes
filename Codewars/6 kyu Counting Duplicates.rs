use std::collections::HashMap;
fn count_duplicates(text: &str) -> u32 {
    let mut count: HashMap<char, u32> = HashMap::new();
    for c in text.to_lowercase().chars() {
        let mut e = count.entry(c).or_default();
        *e += 1;
    }
    count.values().filter(|&&v| v > 1).count() as u32
}
