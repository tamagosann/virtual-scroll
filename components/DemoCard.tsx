import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { FC } from 'react'

type Props = {
  style: any
}

const DemoCard:FC<Props> = ({style}) => {
  return (
    <Card sx={{ maxWidth: 345 }} style={style}>
      <CardMedia
        component="img"
        height="140"
        image="https://cdn.pixabay.com/photo/2021/08/04/03/06/hanoi-6520941_1280.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default DemoCard
