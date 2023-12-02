async function main() {
  await hre.run("compile");
  const myContract = await hre.ethers.getContractFactory("Lock");
  const contract = await myContract.deploy();
  await contract.deployed();
  console.log("CONTRACT ADDRESS: ", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});