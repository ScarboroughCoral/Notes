#[derive(Debug)]
struct Boolean;
impl PartialEq<bool> for Boolean {

fn eq(&self, _: &bool) -> bool { 
    true
 }
}
const omnibool: Boolean = Boolean; //perform you magic
