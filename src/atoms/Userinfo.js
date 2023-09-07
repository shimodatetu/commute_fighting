import * as React from 'react'

import Stack from '@mui/joy/Stack';

import human1 from "./../images/human1.png"

import reset from "./../css/reset.css"
import base from "./../css/base.css"
import module from "./../css/module.css"

const Userinfo = (props) => {
    return (

        <div>

            <div class="userinfo">
                <Stack direction="row">
                    <img class="image" src={human1} />
                    <p class="icon-username-text">{props.name}</p>
                </Stack>
            </div>

        </div>

    )
}

export default Userinfo;