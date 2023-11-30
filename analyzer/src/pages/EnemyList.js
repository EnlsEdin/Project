import react,{useEffect,useState} from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router";
import Enemy from "../components/Enemy"
import FilterButton from "../components/FilterButton";

const FILTER_MAP = {
    All: () => true,
    Elite: (enemy) => enemy.type==="elite",
    Boss: (enemy) => enemy.type==="boss",
    Special: (enemy) => enemy.type==="special",
  };
const FILTER_NAMES = Object.keys(FILTER_MAP)


function EnemyList(){
    const [enemies,setEnemies] = useState([]);
    const [filter, setFilter] = useState("All");
    const navigate = useNavigate();
    useEffect(()=>{
        async function getEnemies(){
            const response = await fetch(`http://localhost:3500/api/enemies/`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const data = await response.json();
            setEnemies(data);
        }
        getEnemies();
        return;
    },[enemies.length]);
    async function deleteEnemy(id){
        await fetch(`http://localhost:3500/api/enemies/${id}`, {
            method: "DELETE"
        });
        await fetch(`http://localhost:3500/api/enemies/allSkill/${id}`,{
            method: "DELETE"
        });
        const newEnemies = enemies.filter((e) => e._id !== id);
        setEnemies(newEnemies);
    }
    const enemyList = enemies.filter(FILTER_MAP[filter]).map((enemy) => (
        <Enemy
            key={enemy._id}
            id={enemy._id}
            name={enemy.name}
            type={enemy.type}
            description={enemy.description}
            skills={enemy.skills}
            deleteEnemy={() => deleteEnemy(enemy._id)}
        />
    ));
    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
      ));
    function AddEnemy(){
        navigate('/AddEnemy');
    }
    return(
        <div>
            <h1>EnemyList</h1>
            <div>
                {filterList}
                <button onClick={AddEnemy}>Create Enemy</button>
            </div>
            <ul>
                {enemyList}
            </ul>
        </div>
    )
}

export default EnemyList;