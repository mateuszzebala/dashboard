import React from 'react'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import styled from 'styled-components'
import { Loading } from '../../atoms/loading/Loading'
import { Table, Field, Row, HeaderRow } from '../../atoms/Table'

export const CountryInfo = ({ country }) => {
    const [countryData, setCountryData] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        FETCH(ENDPOINTS.statistics.country(country)).then((data) => {
            setCountryData(data.data)
            setLoading(false)
        })
    }, [])
    if (loading) return <Loading />
    return (
        <Table>
            <HeaderRow>
                <Field>WHEN</Field>
                <Field>TIMES</Field>
            </HeaderRow>
            <Row>
                <Field>TODAY</Field>
                <Field>{countryData.today}</Field>
            </Row>
            <Row>
                <Field>MONTH</Field>
                <Field>{countryData.month}</Field>
            </Row>
            <Row>
                <Field>YEAR</Field>
                <Field>{countryData.year}</Field>
            </Row>
            <Row>
                <Field>ALL</Field>
                <Field>{countryData.all}</Field>
            </Row>
        </Table>
    )
}
