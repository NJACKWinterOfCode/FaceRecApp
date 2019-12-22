import React,{Component} from 'react'
import "./header.css"

class Header extends Component{
    render(){
       
        return(
                <div className="wrapper">
                    <p className="glitch">
                        <span>FaceRecApp</span>
                    </p>
                    <p className="glitch_fixed">
                        <span>FaceRecApp</span>
                    </p>
                    <p className="glitch_opacity">
                        <span>FaceRecApp</span>
                    </p>
                    <p className="tag">Detect faces in your Images</p>
                </div>
        )
    }
}

export default Header