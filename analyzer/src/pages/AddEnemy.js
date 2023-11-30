import React,{useState}from "react";
import { useNavigate } from "react-router";

function AddEnemy(){
    const [form, setForm] = useState({
        name:"",
        type:"",
        description:"",
    })
    const navigate = useNavigate();
    // update text as user inputs
    function updateForm(value){
        return setForm((prev) => {
            return {...prev,...value};
        });
    }
    // post the enemy to the database
    async function onSubmit(e){
        e.preventDefault();
        const newEnemy = {...form}
        await fetch("api/enemies/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newEnemy),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        setForm({name:"", type:"", description:""});
        navigate("/");
    }
    return(
        // form with enemy infomation
       <div className='container'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })} 
                        autoComplete="false"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <input
                        type="text"
                        className="form-control"
                        id="type"
                        value={form.type}
                        onChange={(e) => updateForm({ type: e.target.value })} 
                        autoComplete="false"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="type"
                        value={form.description}
                        onChange={(e) => updateForm({ description: e.target.value })} 
                        autoComplete="false"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Enemy"
                        className="btn btn-primary"
                    />
                </div>
            </form>
       </div>         
    );
}

export default AddEnemy;