import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { useParams } from 'react-router'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { Field, HeaderRow, Row, Table } from '../../atoms/Table'

export const RequestPage = () => {
    const [data, setData] = React.useState({})
    const {id} = useParams()

    React.useEffect(() => {
        FETCH(ENDPOINTS.requests.info(id)).then((data) => {
            console.log(data.data)
            setData(data.data)
        })
    }, [id])

    return (
        <MainTemplate app={APPS.requests} title={'REQUEST - ' + data.id}>
            <Table>
                <HeaderRow>
                    <Field>PARAM</Field>
                    <Field>VALUE</Field>
                </HeaderRow>
                <Row>
                    <Field>ID</Field>
                    <Field>{data.id}</Field>
                </Row>
                <Row>
                    <Field>DATETIME</Field>
                    <Field>{data.datetime}</Field>
                </Row>
                <Row>
                    <Field>METHOD</Field>
                    <Field>{data.method}</Field>
                </Row>
                <Row>
                    <Field>IP</Field>
                    <Field>{data.ip_v4}</Field>
                </Row>
                <Row>
                    <Field>STATUS CODE</Field>
                    <Field>{data.status_code}</Field>
                </Row>
                <Row>
                    <Field>PATH</Field>
                    <Field>{data.path}</Field>
                </Row>
             
                <Row>
                    <Field>DEVICE</Field>
                    <Field>{data.device}</Field>
                </Row>
                {data.device_type && <Row>
                    <Field>DEVICE TYPE</Field>
                    <Field>{data.device_type}</Field>
                </Row>}
                {data.browser_type && <Row>
                    <Field>BROWSER</Field>
                    <Field>{data.browser_type}</Field>
                </Row>}
                {data.country && <Row>
                    <Field>COUNTRY</Field>
                    <Field>{data.country}</Field>
                </Row>}
                {data.user && <Row>
                    <Field>USER</Field>
                    <Field>{data.user}</Field>
                </Row>}
                {data.session_key && <Row>
                    <Field>SESSION</Field>
                    <Field>{data.session_key}</Field>
                </Row>}
                {data.args && <Row>
                    <Field>ARGS</Field>
                    <Field>{data.args}</Field>
                </Row>}
            </Table>
        </MainTemplate>
    )
}
