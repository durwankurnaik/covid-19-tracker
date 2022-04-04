import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import "../styles/InfoBoxes.css"
import numeral from 'numeral'

function InfoBoxes({title, cases, active, isRed, total, ...props}) {
  return (
    <Card className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`} onClick={props.onClick}>
      <CardContent>
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>

        <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>
          +{numeral(cases).format("0.0a")}
        </h2>

        <Typography className='infoBox__total' color='textSecondary'>
          {numeral(total).format("0.0a")} Total
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBoxes