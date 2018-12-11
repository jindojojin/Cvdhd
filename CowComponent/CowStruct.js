// import {Web3} from '../node_modules/web3/dist/web3.js'
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
const myServerUrl = "https://cvdhd-serverdb.herokuapp.com";
web3.eth.defaultAccount = web3.eth.accounts[0];
const CoursetroContract = web3.eth.contract(
	[
		{
			"constant": true,
			"inputs": [
				{
					"name": "ID",
					"type": "uint256"
				}
			],
			"name": "getInfoAt",
			"outputs": [
				{
					"name": "",
					"type": "string"
				},
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "Id",
					"type": "string"
				},
				{
					"name": "_type",
					"type": "uint8"
				}
			],
			"name": "findID",
			"outputs": [
				{
					"name": "",
					"type": "uint256[]"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_address",
					"type": "address"
				},
				{
					"name": "_cowID",
					"type": "string"
				},
				{
					"name": "_data",
					"type": "string"
				},
				{
					"name": "_type_of_data",
					"type": "uint8"
				}
			],
			"name": "setInstructor",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "countInstructors",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "Id",
					"type": "string"
				}
			],
			"name": "getCowInfoById",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"name": "data",
					"type": "string"
				},
				{
					"indexed": false,
					"name": "cowID",
					"type": "string"
				},
				{
					"indexed": false,
					"name": "type_of_data",
					"type": "uint8"
				}
			],
			"name": "instructorInfo",
			"type": "event"
		}
	]
);

var Coursetro = CoursetroContract.at('0xfee005ca5e3557925e21b5c3dccebd55aa6ffaa8');
var returnEvent = Coursetro.instructorInfo({}, 'latest');

function pushDataToBlockchain(id, data, typeOfData) {
    console.log("Bắt đầu đẩy dữ liệu lên block chain");
    console.log(typeof(id))
    console.log(typeof(data))
    console.log(typeof(typeOfData))
    $("#closeChainModal").hide();
    $("#pushToChain_btn").hide();
    Coursetro.setInstructor(web3.eth.defaultAccount, id, data, typeOfData, (err, res) => {
        if (err) {
            $("#spiner").hide();
            $("#closeModal").click();
        }
        else {
			console.log("ressssss")
            console.log(res);
            web3.eth.getBalance('0xcdb16d92dd1d4f279cad945f200793107d3ec89f', function (error, result) {
                if (!error) {
                    var balance = result.c[0] / 10000
                    $("#balance").html('Balance: ' + balance);
                }
                console.log("Da day len tren, lay du lieu ve");
			})
			sendLogToSerVer(typeOfData,res);

        }
    });
}

DICTLOG= new Map([
	[1,'đã thêm một con bò mới vào hệ thống và đẩy thông tin lên blockchain'],
	[2,'đã đẩy một bản ghi theo dõi sức khỏe lên blockchain'],
	[3,'đã đẩy một bản ghi báo cáo bò bị chết lên blockchain '],
	[4,'đã đẩy một bản ghi chế độ dinh dưỡng lên blockchain'],
	[5,'đã đẩy một bản ghi về thông tin xuất chuồng'],
	[6,'đã đẩy một bản ghi về việc sử dụng thuốc thú y'],
	[7,'đã đẩy một bản ghi về lịch sử bệnh của bò']
])
function sendLogToSerVer(typeOfLog,transaction){
	let log={};
	log.content="Người nhập liệu "+ getCookie("name")+" "+DICTLOG.get(typeOfLog);
	log.transaction_hash=transaction
	console.log(log);
	$.ajax({
        url: myServerUrl + "/addLog",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(log),
        dataType: 'json',
        success: function (res) {
            // cowInfo._id = data._id; // lấy id do server trả về và đẩy dữ liệu lên blockchain
            console.log("Đẩy log thành công");
        },
        error: function (error) {
            console.log("thaat bai")
            console.log(error);
            $("#loader").hide();
            $("#CowInfoForm").show();
        }
    });
}

function getCookie(name) {
	const nameLenPlus = (name.length + 1);
	return document.cookie
		.split(';')
		.map(c => c.trim())
		.filter(cookie => {
			return cookie.substring(0, nameLenPlus) === `${name}=`;
		})
		.map(cookie => {
			return decodeURIComponent(cookie.substring(nameLenPlus));
		})[0] || null;
}