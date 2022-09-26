'use strict'

const init = async () => {
    const users = await  fetch('http://localhost:1337/api/wallets?sort[0]=id%3Aasc', {
        
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 57b4f3dbf9253a47e386eeca1afc6399cb81c04479c2a54770dd3341bf356e863d1399dcb036f9b20c77bc0b80f0d3c0ac3b748c4777bd36a1952391125c05ae14d8ec322bda3c3502f5b0eadd88ca8ce0147dc8ed7f37aee71caac0ebee4e478100d523c9bec3372e12cf40d4f8947ccca664303242777083653586fb6049d5'
        }, 
        method: 'GET'
    })
    const userObj = await users.json();
    console.log(userObj.data)
    const select = document.querySelector('#userSel');
    userObj.data.map(item => {
        let ele = document.createElement('option');
        ele.value = item.id;
        ele.innerHTML = item.attributes.wallet_address;
        select.appendChild(ele);
    })
    
}

init();