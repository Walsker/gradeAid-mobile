// React Native imports
import React, {Component} from 'react';
import {Image, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {selectPage, selectSemester} from './actions';

// Custom imports
import {colors, containerStyle} from 'gradeAid/src/common/appStyles';
import Divider from './divider';
import DrawerItem from './drawerItem';

const SEMESTER_SCREEN = 0;
const ABOUT_SCREEN = 1;
const SETTINGS_SCREEN = 2;

class NavDrawer extends Component
{
	createSemesterLink(semesterID)
	{
		let semesterObject = this.props.semesterList[semesterID];

		if (semesterObject)
		{
			return (
				<DrawerItem
					key = {semesterObject.name}
					title = {semesterObject.name}
					active = {(semesterID == this.props.selectedSemester) && (this.props.selectedPage == SEMESTER_SCREEN)}
					action = {() =>
					{
						this.props.selectPage(SEMESTER_SCREEN);
						this.props.selectSemester(semesterID);
						this.props.navigation.closeDrawer();
						this.props.navigation.navigate("Semester");
					}}
				/>
			);
		}
		else
			return;
	}

	render()
	{
		console.log(this.props.selectedPage);
		let semesterIDs = Object.keys(this.props.semesterList);
		semesterIDs.sort((a, b) => this.props.semesterList[a].name - this.props.semesterList[b].name);
		let semesterPageLinks = semesterIDs.map(semesterID => this.createSemesterLink(semesterID));

		if (Object.keys(this.props.semesterList).length != 0)
			semesterPageLinks.push(<Divider key = "Divider"/>);

		return (
			<View style = {containerStyle.default}>
				<View style = {containerStyle.drawerHeader}>
					<Image 
						source = {require('gradeAid/assets/graphics/drawerLogo.png')}
						fadeDuration = {0}
						resizeMethod = 'scale'
						style =
						{{
							flex: 1,
							width: undefined,
							height: undefined,
							resizeMode: 'center',
							marginRight: 25
						}}
					/>
				</View>
				<View style = {containerStyle.default}>
					<View style = {{marginVertical: 5}}/>
					{semesterPageLinks}
					<DrawerItem
						title = "New Semester"
						active = {false}
						action = {() =>
						{
							// this.props.navigation.closeDrawer();
							this.props.navigation.navigate("NewSemesterPage");
						}}
					/>
					<Divider color = {colors.dividerColor}/>
					{/* <DrawerItem
						title = "Settings"
						active = {this.props.selectedPage == SETTINGS_SCREEN}
						action = {() =>
						{
							this.props.selectPage(SETTINGS_SCREEN);
							this.props.navigation.navigate("Settings");
						}}
					/> */}
					<DrawerItem
						title = "About"
						active = {this.props.selectedPage == ABOUT_SCREEN}
						action = {() =>
						{
							this.props.selectPage(ABOUT_SCREEN);
							this.props.navigation.navigate("About");
						}}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	console.log("SELECTED PAGE: ", state.selectedPage);
	return {
		semesterList: state.semesterList,
		selectedSemester: state.selectedSemester,
		selectedPage: state.selectedPage
	};
}

export default connect(mapStateToProps, {selectPage, selectSemester})(NavDrawer);