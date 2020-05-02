fn accum(s:&str)->String {
  s.chars().enumerate().map(|(i,c)| c.to_string().to_uppercase()+c.to_string().to_lowercase().repeat(i).as_str()).collect::<Vec<String>>().join("-")
}