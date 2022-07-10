import { 
    List, 
    ListItem, 
    ListItemAvatar, 
    ListItemText 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase';

import './styles.css';

function Todo({data}){
    return(
        <List className="todo__list">
            <ListItem>
                <ListItemAvatar />
                <ListItemText 
                    primary={data.todo}
                    secondary={data.todo}
                />
            </ListItem>
            <DeleteIcon
                fontSize="large" 
                style={{opacity: 0.7}} 
                onClick={()=>{
                    deleteDoc(doc(db,'todos',data.id))
                }}
            />
        </List>
    )
}

export { Todo }