const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('can Create a Star', async() => {
    let tokenId = 1;
    let instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});

it('lets user1 put up their star for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 2;
    let starPrice = web3.utils.toWei(".01", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 3;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyStar(starId, {from: user2, value: balance});
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);
    assert.equal(value1, value2);
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 4;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance});
    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 5;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance, gasPrice:0});
    const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
    let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
    assert.equal(value, starPrice);
});

// Implement Task 2 Add supporting unit tests

it('can add the star name and star symbol properly', async() => {
    // 1. create a Star with different tokenId
    const instance = await StarNotary.deployed();
    const starId = 6;
    await instance.createStar('Udacity Star!', starId, {from: accounts[0]})
    //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
    let name = await instance.name();
    let symbol = await instance.symbol();
    let starLookup = await instance.lookUptokenIdToStarInfo(starId);

    assert.equal(name, 'Udacity Token');
    assert.equal(symbol, 'UDT');
    assert.equal(starLookup, 'Udacity Star!');
});

it('lets 2 users exchange stars', async() => {
    const instance = await StarNotary.deployed();
    const user1 = accounts[0];
    const user2 = accounts[1];
    const starId1 = 7;
    const starId2 = 8;
    // 1. create 2 Stars with different tokenId
    await instance.createStar('usr1 star', starId1, {from: user1});
    await instance.createStar('usr2 star', starId2, {from: user2});
    // 2. Call the exchangeStars functions implemented in the Smart Contract
    await instance.exchangeStars(starId1, starId2);
    const star1 = await instance.ownerOf.call(starId1);
    const star2 = await instance.ownerOf.call(starId2);
    // 3. Verify that the owners changed
    assert.equal(star1, user2);
    assert.equal(star2, user1);
});

it('lets a user transfer a star', async() => {
    const instance = await StarNotary.deployed();
    const usr1 = accounts[0];
    const usr2 = accounts[1];
    const starId = 9;
    // 1. create a Star with different tokenId
    await instance.createStar('Star to Transfer', starId, {from : usr1});
    // 2. use the transferStar function implemented in the Smart Contract
    await instance.transferStar(usr2, starId, {from : usr1});
    // 3. Verify the star owner changed.
    const star = await instance.ownerOf.call(starId);
    assert.equal(star, usr2);
});

it('lookUptokenIdToStarInfo test', async() => {
    const instance = await StarNotary.deployed();
    const starId1 = 10;
    const starId2 = 11;
    // 1. create a Star with different tokenId
    await instance.createStar('Token 1', starId1, {from : accounts[0]});
    await instance.createStar('Token 2', starId2, {from : accounts[0]});
    // 2. Call your method lookUptokenIdToStarInfo
    let starLookup1 = await instance.lookUptokenIdToStarInfo(starId1);
    let starLookup2 = await instance.lookUptokenIdToStarInfo(starId2);
    // 3. Verify if you Star name is the same
    assert.equal(starLookup1, 'Token 1');
    assert.equal(starLookup2, 'Token 2');
});
