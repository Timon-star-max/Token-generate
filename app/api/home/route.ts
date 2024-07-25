import { NextResponse } from "next/server";
import { ethers } from "ethers";
import TokenGeneratorABI from "@/utils/abi/origin.json";

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);
const config = {
  tokenGeneratorAddress: `${process.env.TOKEN_GENERATOR_ADDRESS}`,
  factories: [
    "0x80e05E7438A6Ff66b01d64C813E8bB6339ECd052", // simple
    "0xBc5c4Ae56CD181089a2b1402588B7D6ff29d5f6F", // mintable
    "0x24E1e17B54973b1F004df3E8A983Ae405A038e0D", // burnable
    "0xfbC8c2B6C3aEF73E0BFDB56A2a1BfDD5B83e7487", // mintburn
    "0xCbaC7772BDb35Ab605A030612849AeDBA2068436", // tax
  ],
};

async function getCreationFee(contract: any) {
  try {
    return await contract.creationFee();
  } catch (error) {
    console.error("Error fetching creation fee:", error);
    throw error;
  }
}

export async function POST(req: Request) {
  const json = await req.json();
  const { formvalue, mint, burn, tax } = json;
  
  const {
    tokenName,
    tokenSymbol,
    tokenInitsupply,
    tokenDecimals,
    maxSupply,
    liqidityShare,
    teamShare,
    buyTaxfee,
    sellTaxfee,
  } = formvalue;

  // Log input values to help with debugging
  console.log("Received form values:", formvalue);

  let index = 0;
  if (!mint && !burn && !tax) index = 0;
  if (mint && !burn && !tax) index = 1;
  if (!mint && burn && !tax) index = 2;
  if (mint && burn && !tax) index = 3;
  if (!mint && !burn && tax) index = 4;

  // Check and log all values before constructing the params object
  console.log("Values before constructing params:", {
    tokenName,
    tokenSymbol,
    tokenInitsupply,
    tokenDecimals,
    maxSupply,
    liqidityShare,
    teamShare,
    buyTaxfee,
    sellTaxfee,
    index,
  });

  const params = {
    factoryIndex: index,
    mintable: mint,
    burnable: burn,
    name: tokenName,
    ticker: tokenSymbol,
    initialSupply: ethers.parseUnits(tokenInitsupply.toString(), tokenDecimals),
    maxSupply: maxSupply && ethers.parseUnits(maxSupply.toString(), tokenDecimals),
    taxToken: tax,
    sellTax: ethers.parseUnits(sellTaxfee, 18),
    buyTax: ethers.parseUnits(buyTaxfee, 18),
    liquidityShare: ethers.parseUnits(liqidityShare, 18),
    teamShare: ethers.parseUnits(teamShare, 18),
  };

  // Log params to help with debugging
  console.log("Constructed params:", params);

  const tokenGeneratorContract = new ethers.Contract(
    config.tokenGeneratorAddress,
    TokenGeneratorABI,
    wallet
  );
  const creationFee = await getCreationFee(tokenGeneratorContract);

  try {
    const tx = await tokenGeneratorContract.deployToken(params, "0x", {
      value: creationFee,
    });

    console.log("Transaction hash:", tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction mined:", receipt);

    return NextResponse.json({ status: 200, data: "success" });
  } catch (error) {
    console.error("Error deploying token:", error);
    return NextResponse.json({ status: 500, data: "Transaction Error" });
  }
}
