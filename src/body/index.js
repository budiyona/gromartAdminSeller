// import { Container, CssBaseline, Grid, withStyles } from "@material-ui/core";
// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Redirect, Route, Switch } from "react-router-dom";
// import { Menu, PaginationControlled } from "../component";
// import RecipeReviewCard from "../component/card-product";
// const useStyles = (theme) => ({
//   margin: {
//     marginBottom: "12px",
//   },
// });
// class Body extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     const { classes } = this.props;
//     console.log(this.props.isLogin);
//     if (!this.props.isLogin) {
//       return <Redirect to="/login" />;
//     } else {
//       return (
//         <>
//           <Container maxWidth="md" spacing={3}>
//             <Grid
//               container
//               direction="row"
//               justify="space-between"
//               alignItems="center"
//             >
//               <Grid container item xs={12}>
//                 <Menu history={this.props.history}></Menu>
//               </Grid>
//               <Grid container item xs={12} className={classes.margin}>
//                 <Grid item xs={4}>
//                   <RecipeReviewCard></RecipeReviewCard>
//                 </Grid>
//                 <Grid item xs={4}>
//                   <RecipeReviewCard></RecipeReviewCard>
//                 </Grid>
//                 <Grid item xs={4}>
//                   <RecipeReviewCard></RecipeReviewCard>
//                 </Grid>
//               </Grid>
//               <Grid container item xs={12} className={classes.margin}>
//                 <Grid item xs={4}>
//                   <RecipeReviewCard></RecipeReviewCard>
//                 </Grid>
//                 <Grid item xs={4}>
//                   <RecipeReviewCard></RecipeReviewCard>
//                 </Grid>
//                 <Grid item xs={4}>
//                   <RecipeReviewCard></RecipeReviewCard>
//                 </Grid>
//               </Grid>
//               <Grid container item xs={12}>
//                 <PaginationControlled page={10}></PaginationControlled>
//               </Grid>
//             </Grid>

//             <Grid
//               container
//               direction="row"
//               justify="space-between"
//               alignItems="center"
//             >
//               <Grid container item xs={12}>
//                 <Menu history={this.props.history}></Menu>
//               </Grid>
//               <Grid container item xs={12} className={classes.margin}>
//                 <Grid item xs={4}>
//                   <RecipeReviewCard></RecipeReviewCard>
//                 </Grid>
//                 <Grid item xs={4}>
//                   <RecipeReviewCard></RecipeReviewCard>
//                 </Grid>
//                 <Grid item xs={4}>
//                   <RecipeReviewCard></RecipeReviewCard>
//                 </Grid>
//               </Grid>
//               <Grid container item xs={12} className={classes.margin}>
//                 <Grid item xs={4}>
//                   <RecipeReviewCard></RecipeReviewCard>
//                 </Grid>
//                 <Grid item xs={4}>
//                   <RecipeReviewCard></RecipeReviewCard>
//                 </Grid>
//                 <Grid item xs={4}>
//                   <RecipeReviewCard></RecipeReviewCard>
//                 </Grid>
//               </Grid>
//               <Grid container item xs={12}>
//                 <PaginationControlled page={10}></PaginationControlled>
//               </Grid>
//             </Grid>
//           </Container>
//         </>
//       );
//     }
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     isLogin: state.auth.isLogin,
//   };
// };
// export default connect(mapStateToProps)(withStyles(useStyles)(Body));
