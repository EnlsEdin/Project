import React,{useState}from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

function AddSkill(){
    const [form, setForm] = useState({
        name:"",
        type:"",
        description:""
    })
    
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;
    function updateForm(value){
        return setForm((prev) => {
            return {...prev,...value};
        });
    }
    async function onSubmit(e){
        e.preventDefault();
        const newSkill = {...form}
        await fetch(`api/enemies/${id}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newSkill),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        setForm({name:"",type:"",description:""});
        navigate('/');
    }
    return(
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
                        value="Create Skill"
                        className="btn btn-primary"
                    />
                </div>
            </form>
       </div>         
    );
}

export default AddSkill;