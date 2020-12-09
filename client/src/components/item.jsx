import React from 'react'
import { Card, Typography }  from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    root: {
      margin: theme.spacing(3),
      width: 345,
    },
    media: {
      height: 140,
    },
    typography: {
      fontFamily: [
        'Shrikhand',
        'cursive',
      ]},
    title: {
      color: theme.palette.primary.main
    },
  }))

  const Item = () => {
    const classes = useStyles()
    
    return (
      <Card className={classes.root}>
          <Typography/>
      </Card>  
    )
}

export default Item