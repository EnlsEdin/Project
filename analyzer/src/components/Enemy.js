import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
function Enemy(props){
    const [skills,setSkills] = useState([]);
    const [isExpand, setExpand] = useState(false);
    const navigate = useNavigate();
    // move the the add skill page with the enemy's id as property
    function AddSkill(id){
      navigate('/AddSkill',{state:{id}});
    }
    // get all skills with the enemy's id
    useEffect(()=>{
        async function getSkills(){
          const response = await fetch(`api/enemies/skill/${props.id}`);
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
          const data = await response.json();
          setSkills(data);
        }
        getSkills();
        return;
    },[skills.length])
    // delete the skill of this enemy with the skill's id
    async function deleteSkill(id){
      await fetch(`api/enemies/skill/${id}`, {
          method: "DELETE"
      });
      const newSkills = skills.filter((e) => e._id !== id);
      setSkills(newSkills);
    }
    //create skill list
    const skillList = skills.filter((skill)=>skill.enemyId === props.id).map((skill)=>(
        <div key={skill._id} id={skill._id} name={skill.name} description={skill.description}>
            <button onClick={()=>{deleteSkill(skill._id)}}>Delete</button>
            <p>{skill.name}:  {skill.description}</p>
        </div>
    ));
    // expanded template with list of skills
    const expandTemplate = (
        <div className="displayBlock">
          <div>
                <button onClick={()=>AddSkill(props.id)}>Add Skill</button>
                <button onClick={()=>setExpand(false)}>ChangeDisplay</button>
                <button onClick={()=>{props.deleteEnemy(props.id)}}>Delete</button>
            </div>
            <div>
                <label className="enemy-label" htmlFor={props.name}>name: {props.name}</label>
                <label className="enemy-label" htmlFor={props.type}>type: {props.type}</label>
            </div>
          <div>
              <p>description: {props.description}</p>
          </div>
          <div>
              <h4>skills: </h4>
              <ul>
                  {skillList}
              </ul>
          </div>
        </div>
    );
    // simple template
    const listTemplate = (
        <div className="displayBlock">
            <div>
                <button onClick={()=>AddSkill(props.id)}>Add Skill</button>
                <button onClick={()=>setExpand(true)}>ChangeDisplay</button>
                <button onClick={()=>{props.deleteEnemy(props.id)}}>Delete</button>
            </div>
            <div>
                <label className="enemy-label" htmlFor={props.name}>name: {props.name}</label>
                <label className="enemy-label" htmlFor={props.type}>type: {props.type}</label>
            </div>
            <div>
                <p>description: {props.description}</p>
            </div>
        </div>
    );
    return <li className="todo">{isExpand ? expandTemplate : listTemplate}</li>;
}

export default Enemy;