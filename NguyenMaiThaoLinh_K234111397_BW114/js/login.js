function select_one(json_accounts,uid,pwd) {
    for (let i=0;i<json_accounts.length;i++) {
        let ac=json_accounts[i];
        if(ac.user==uid && ac.password==pwd) return ac;
    }
    return null;
}
function process_login() {
  let uid = document.myform.user_name.value.trim();
  let pwd = document.myform.user_password.value.trim();
  let errorBox = document.getElementById("error-box");
  const correctUser = "ngocvb";
  const correctPass = "vobichngoc142@";
  if (uid === correctUser && pwd === correctPass) {
    errorBox.classList.remove("show");
    localStorage.setItem("login_infor", JSON.stringify({ user: uid, password: pwd }));
    localStorage.setItem("save_infor", document.myform.save_info.checked);
    window.location.href = "/html/index.html";
  } else {
    errorBox.classList.add("show");
  }
}
function load_login_infor() {
    let json_string=localStorage.getItem("login_infor");
    if(!json_string) return;
    let json_object=JSON.parse(json_string);
    let save=localStorage.getItem("save_infor");
    if(save=='true') {
        document.myform.user_name.value=json_object.user;
        document.myform.user_password.value=json_object.password;
        document.myform.save_info.checked=true;
    }
}
window.onload=load_login_infor;