const saveData=()=>{
    const userName=document.getElementById("name").value
    const userEmail=document.getElementById("email").value
    const userPassword=document.getElementById("password").value
    console.log(userEmail,userName,userPassword)
    let user_records=localStorage.getItem("users")?JSON.parse(localStorage.getItem("users")):[]
    if(user_records.some((v)=>{
        return v.email===userEmail
    }))
    {
        alert("Email Already Exist")
    }else{
        user_records.push({
            'name':userName,
            'email':userEmail,
            'password':userPassword
        })
        localStorage.setItem("users",JSON.stringify(user_records))
    }
}


const checkData=()=>{
    const userEmail=document.getElementById("email").value
    const userPassword=document.getElementById("password").value
    let user_record;
    user_record=localStorage.getItem("users")?JSON.parse(localStorage.getItem("users")):[]
    if(user_record.some((v)=>{ 
        return v.email==userEmail && v.password==userPassword
    }))
        {
        alert("Login Successfull")
        let currentUser=user_record.filter((v)=>v.email==userEmail && v.password==userPassword
        )[0]
        localStorage.setItem("name",currentUser.name)
        localStorage.setItem("password",currentUser.password)
        window.location.href="profile.html"
        console.log("Redirecting to profile.html");
    }
    else{
        alert("Login Failed")
    } 
}



function logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("password");
    window.location.href = "login.html";
    console.log("Logging out and redirecting to login.html");
}