import React, { Component } from "react";
import { getUsers, getOrganizations } from "./api";

class App extends Component {
  state = {
    loading: false,
    selectedOrg: false,
    users: [],   // поместили в локальный state (так будет более правильно)  
    organizations: [] // так же поместили в локальный state
  };

  componentDidMount() {
    getUsers() // сделали обычные методы, хотя можно писать и стрелочные фун-и как в исходнике
      .then((users) => this.setState({ users }))
    getOrganizations() //запрос сделали отдельно, что бы запросы шли по отдельности 
      .then((organizations) => this.setState({ organizations }))
      .then(() => this.setState({ loading: true }));
  }

  selectResetOrg(org){
    this.setState({ selectedOrg: org }); // объединили в одну фун-ю и искл. дублир., сократ. код
  }

  render() {
    const {loading, users, organizations, selectedOrg} = this.state; //делаем деструктуризацию this.state для сокращ. кода
    if (!loading) return "Loading..." 
    
  
    const getContent = (u) => { //выносим в отд. фун-ю и искл. дублир. и сокращаем код
      return <div className="user-list-item" key={u.id}> {/* добавили ключ, для исключения ошибок*/}
                <div>Name: {u.name}</div>
                <div onClick={() => this.selectResetOrg(u.organization)}>
                  Organizations: {organizations.find((o) => 
                    o.id === u.organization).name} 
                </div>
            </div>
  }

    const content = selectedOrg === false? // записываем в переменную контент в зввисимости от того, задана ли организация
       users.map((u) => getContent(u)) : users.filter((u) => 
       u.organization === selectedOrg).map((u) => (getContent(u)))
    return (
      <div>
        {selectedOrg !== false && ( //выводим либо список, либо отсортированные организации
          <button onClick={() => this.selectResetOrg(false)}>
            Reset selected org
          </button>
        )}
        <div>{content}</div>
      </div>
    )
  }
}

export default App;

// Так же см. файл index.js