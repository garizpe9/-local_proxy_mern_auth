import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../../theme'
import Typography from '@material-ui/core/Typography';
import { Button, CardContent, 
    Card, Grid, Paper, TextField 
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import axios from 'axios'
class Attempt extends Component {
    constructor() { 
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null,
            classes:{}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }
    useStyles = makeStyles((theme) => ({

    }));
    componentDidMount(){this.setState({classes:this.useStyles})}

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/api/user/', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return(
                <ThemeProvider theme={theme}>
                <CssBaseline />
                    <Container maxWidth="lg" align="center">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid item xs={8}>
                                <Card color="secondary">
                                    <CardContent id="register">
                                        <Grid item xs={12}>
                                            <Paper className={this.state.classes.paper}>
                                                <Grid item xs={12}>
                                                    <Typography gutterBottom variant="h3" component="h2">
                                                        Register
                                                        <h5>username</h5>
                                                        <TextField
                                                            onChange={this.handleChange}
                                                            name="username"
                                                        />
                                                    </Typography>
                                                </Grid>
                                                <Typography gutterBottom variant="h3" component="h2">
                                                    password
                                                    <br />
                                                    <TextField
                                                        onChange={this.handleChange}
                                                        name="password"
                                                    />
                                                    <br />
                                                </Typography>
                                                <Button
                                                    disabled={!(this.state.password && this.state.username)}
                                                    onClick={this.handleSubmit}>Submit
                                                </Button>
                                            </Paper>
                                            <Paper className={this.state.classes.paper}>
                                                Already registered?
                                                <Button 
                                                    href={`/login`}
                                                    color="primary"
                                                    type="submit">
                                                        Login Here!
                                                </Button>
                                            </Paper>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </ThemeProvider>
            )}
            
        
    }
}

export default Attempt
