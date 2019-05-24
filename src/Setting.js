import React, { Component }from 'react'

const salaryEnums = {
    normalHours  : "normalHours",
    normalSalary : "normalSalary",
    extraSalary  : "extraSalary"  
  }

export default class Setting extends Component {
  
    // state = {
    //   normalHours  : this.props.normalHours  ,
    //   normalSalary : this.props.normalSalary ,
    //   extraSalary  : this.props.extraSalary  
    // }
    
    render () {
      return <>
       <h3>Setting</h3>
       <form  >
        <label>
          Normal hours : 
          <input type = "number"
            name = { salaryEnums.normalHours }
            value = { this.props.normalHours }
            onChange = { this.props.handleSettingChange }
          />
        </label>
        <br/>
  
        <label>
          Normal salary  : 
          <input type = "number" 
            name = { salaryEnums.normalSalary }
            value = { this.props.normalSalary }
            onChange = { this.props.handleSettingChange }
          />
        </label>
        <br/>
  
        <label>
          Extra salary  : 
          <input type = "number" 
            name = { salaryEnums.extraSalary }
            value = { this.props.extraSalary }
            onChange = { this.props.handleSettingChange }
          />
        </label>
        <br />
       </form>
       </>
    }
}