import React from 'react';
import {RootState} from "../../store/reducer";
import {Dispatch} from "redux";
import {connect, ConnectedProps} from "react-redux";
import {Container} from "@material-ui/core";
import "./Test.scss"
import {TestApi} from "../../api/test";
import {Api} from "../../api/api";
import Typography from "@material-ui/core/Typography";
import {PowerApi} from "../../api/core";
import { Powerplan } from '../../api/core/models';

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


const Test = (props: ReduxTypes) => {


    const [msg, setMsg] = React.useState<Powerplan[]>();

    React.useEffect(() => {

        const fetchData = async () => {
            const {data} = (await new PowerApi({basePath: "http://localhost:4000"}).powerListPowerplan());
            setMsg(data)
        }
        fetchData();

    }, [])


    return (
        <Container className={"Text"}>
            <Typography>Powerplans: </Typography>
            {msg?.map(x =>  <p>{x.label}</p>)}
        </Container>
    );

}


export default connector(Test);
