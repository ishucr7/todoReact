import React from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends React.Component{
    render(){
        return <div>
            <img class="center" src="https://cdn.pixabay.com/photo/2016/04/24/22/30/monitor-1350918_960_720.png"  />
            <p style={{textAlign:"center"}}>
                <br />
              <Link to="/">Go to Home </Link>
            </p>
          </div>;
    }
}

export default NotFoundPage;