'use strict'

const BASE_URL = 'http://aholding.com.bh:1337/api';

const init = async () => {
    const users = await fetch(`${BASE_URL}/wallets?sort[0]=id%3Aasc&pagination[pageSize]=100`, {

        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 735b053ca88fddcd3fe63de1b5ec22887d3b70b7543e07eff2f7911f9b3ca8b4deda0c62d8a2a02f261581df34f657f698746856ef0e88b4546a9bef5ac6b303a26d6939a6a8ccdb44251960c655346e646fe7f27bcce067d35420ce21ce6b8e1a3f36fdd6d5ee26c0817f8fbc65a523410f4a3d2ab1d51ed3c4fcd60b5824fa'
        },
        method: 'GET'
    })
    const userObj = await users.json();
    console.log(userObj)
    const select = document.querySelector('#userSel');
    userObj.data.map(item => {
        if (item.attributes.parent_wallet_id) {
            let ele = document.createElement('option');
            ele.value = item.id;
            ele.innerHTML = item.attributes.wallet_address;
            select.appendChild(ele);
        }
    })

}

init();

const harvest = async () => {
    const userId = document.querySelector("#userSel").value;
    const url = `${BASE_URL}/cal-pro-com?id=${userId}&apy=0.002117504`
    const harvest = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 735b053ca88fddcd3fe63de1b5ec22887d3b70b7543e07eff2f7911f9b3ca8b4deda0c62d8a2a02f261581df34f657f698746856ef0e88b4546a9bef5ac6b303a26d6939a6a8ccdb44251960c655346e646fe7f27bcce067d35420ce21ce6b8e1a3f36fdd6d5ee26c0817f8fbc65a523410f4a3d2ab1d51ed3c4fcd60b5824fa'
        },
        method: 'GET'
    })
    const data = await harvest.json();
    const table = document.querySelector("#harvest table tbody");
    table.innerHTML = '';
    console.log(data)
    data.map(item => {
        const child = `
                            <td class="text-center">${item.this_farmer}</td>
                            <td class="text-center">${item.package}</td>
                            <td class="text-center">${item.package_value}</td>
                            <td class="text-center">${item.profit}</td>
                            <td class="text-center">${item.commission}</td>
                            <td class="text-center">${item.from_farmer}</td>
                            <td class="text-center">${item.level}</td>
                            <td class="text-center">${item.harvestMinutes}</td>
                            <td class="text-center">${item.apy}</td>
                            <td class="text-center">${(item.commission_percentage) ? item.commission_percentage : 0}</td>
                            <td class="text-center">${new Date(item.last_harvest_time).toISOString()}</td>
                        `;
        const ele = document.createElement('tr');
        ele.innerHTML = child;
        table.appendChild(ele);

    })
    withdraw(data)

}

const withdraw = (data) => {
    const table = document.querySelector("#withdraw table tbody");
    table.innerHTML = '';
    let profit = 0.00;
    let commission = 0.00;
    data.map(item => {
        profit += parseFloat(item.profit);
        commission += parseFloat(item.commission);

    })

    const child = `
                    <td class="text-center">${data[0].this_farmer}</td>
                    <td class="text-center">${data[0].package}</td>
                    <td class="text-center">${data[0].package_value}</td>
                    <td class="text-center">${profit.toFixed(2)}</td>
                    <td class="text-center">${commission.toFixed(2)}</td>
                `;
    const ele = document.createElement('tr');
    ele.innerHTML = child;
    table.appendChild(ele);
}

document.querySelector('#btnHarvest').addEventListener('click', harvest);