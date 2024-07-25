"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { baseTokenSchema, type TokenFormValues } from "@/lib/form-schema";
import { useAccount } from "wagmi";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import LoginAnimation from "@/components/animate/LoginAnimation";
import ProgressBar from "@/components/progress/ProgressBar";
import { ChainButton } from "@/components/connectWallet/ChainButton";
import ImageUpload from "@/components/imageUpload/ImageUpload";
import { Supabase } from "@/utils/client";

import { AlertCircle, Monitor, Redo, Settings } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";

import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ismint, setIsMint] = useState(false);
  const [isburn, setIsBurn] = useState(false);
  const [istax, setIsTax] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { isConnected } = useAccount();
  const { toast } = useToast();

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const card5Ref = useRef(null);

  const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref, card5Ref];

  const formSchema = ismint
    ? baseTokenSchema.extend({
        maxSupply: z.coerce.number().min(21000000, {
          message: "Max supply must be at least greater than 21000000.",
        }),
      })
    : baseTokenSchema;

  const schema = istax
    ? formSchema.extend({
        buyTaxfee: z.coerce
          .number()
          .max(3, {
            message: "Total supply must be at least less than 3%.",
          })
          .min(0, {
            message: "Initial supply must be at least greater than 0.",
          }),
        sellTaxfee: z.coerce
          .number()
          .max(3, {
            message: "Total supply must be at least less than 3%.",
          })
          .min(0, {
            message: "Initial supply must be at least greater than 0.",
          }),
        liqidityShare: z.coerce.number().max(100, {
          message: "Initial supply must be at least greater than 100%.",
        }),
        teamShare: z.coerce.number().max(100, {
          message: "Initial supply must be at least greater than 100%.",
        }),
      })
    : formSchema;

  const form = useForm<TokenFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const {
    control,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setLoading(true);

      if (selectedFile) {
        const { data, error } = await Supabase.storage
          .from("uploads")
          .upload(`public/${selectedFile.name}`, selectedFile);

        if (error) {
          throw new Error(error.message);
        }
      }
      const formvalue = form.getValues();
      const res = await fetch(`/api/home`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formvalue,
          mint: ismint,
          burn: isburn,
          tax: istax,
        }),
      });

      if (res.ok) {
        toast({
          variant: "default",
          title: "Alert: Catch up",
          description: `${formvalue.tokenName} Successfully Distributed.`,
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Transaction Failed",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    isConnected && setProgress(1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.findIndex(
              (ref) => ref.current === entry.target
            );
            setProgress(index + 1);
          }
        });
      },
      { threshold: 0.5 }
    );

    cardRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      cardRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [cardRefs]);

  return (
    <div className="bg-[#080808]">
      <Header></Header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            id="deploy"
            className="relative flex flex-col w-full items-center justify-center min-h-screen"
          >
            <div className="fixed bottom-10 w-11/12 max-w-4xl h-12 flex items-center justify-center z-20">
              <div className="absolute inset-0 bg-zinc-800 blur-[1px] rounded-xl"></div>
              <div className="relative w-full flex items-center justify-center h-full">
                <ProgressBar currentStep={progress} />
              </div>
            </div>

            <div className="w-full px-4">
              <Card
                id="card1"
                ref={card1Ref}
                className="my-4 border-[#05B7D1] rounded-3xl"
              >
                <CardHeader>
                  <CardTitle>Blockchain</CardTitle>
                  <CardDescription>
                    Connect to the chosen blockchain.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col w-full">
                    <ChainButton></ChainButton>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="h-20 w-full px-4 py-2 mx-auto bg-gradient-to-r from-[#eea585] to-[#f2a384] rounded-xl">
                    <div className="flex flex-row">
                      <AlertCircle className=""></AlertCircle>
                      <p className="text-slate-500 text-[13px] my-auto">
                        Alert
                      </p>
                      <p className="ml-auto text-[13px] text-[#9900ef]">
                        View Now
                      </p>
                    </div>
                    <p className="ml-6 text-[12px] my-auto">
                      Currently, token distribution is only possible on the
                      Ethereum and Sepolia networks.
                    </p>
                  </div>
                </CardFooter>
              </Card>
              <div className="px-2">
                <Card
                  id="card2"
                  ref={card2Ref}
                  className="border-t-[#05B7D1] border-b-[#05B7D1]"
                >
                  <CardHeader>
                    <CardTitle>General</CardTitle>
                    <CardDescription>
                      Connect to the chosen blockchain.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="tokenName"
                      render={({ field }) => (
                        <FormItem className="my-2">
                          <FormLabel className="text-[#05B7D1]">
                            Token Name*
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="e.g.Good Luck Token"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Choose a great name for your token.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tokenSymbol"
                      render={({ field }) => (
                        <FormItem className="my-2">
                          <FormLabel className="text-[#05B7D1]">
                            Symbol:
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="e.g.GLT"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Choose a great symbol for your token.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tokenInitsupply"
                      render={({ field }) => (
                        <FormItem className="my-2">
                          <FormLabel className="text-[#05B7D1]">
                            Initial Supply:
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="21000000"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Choose how many tokens you want to create.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="h-10 w-full px-2 py-2 mx-auto bg-gradient-to-r from-[#eea585] to-[#f2a384] rounded-xl">
                      <div className="flex flex-row">
                        <AlertCircle className=""></AlertCircle>
                        <p className="text-[12px] my-auto">
                          1 ≤ Initial Supply ≤ 9 999 999 999 999 999.9
                        </p>
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name="tokenDecimals"
                      render={({ field }) => (
                        <FormItem className="my-2">
                          <FormLabel className="text-[#05B7D1]">
                            Decimals(1-18):
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="18"
                              disabled={loading}
                              {...field}
                              max={18}
                              min={1}
                            />
                          </FormControl>
                          <FormDescription>
                            Choose a great name for your token.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </div>
            </div>
            <Card
              id="card3"
              ref={card3Ref}
              className="my-4 border-t-[#05B7D1] rounded-t-2xl w-full"
            >
              <CardHeader>
                <CardTitle>Specific Funtions</CardTitle>
                <CardDescription>Mintable, Bunable functions</CardDescription>
              </CardHeader>
              <CardContent className="w-full flex flex-row">
                <div className="z-10">
                  <div className="flex items-center space-x-4 rounded-md border p-4">
                    <Monitor></Monitor>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Mintable
                      </p>
                      <p className="text-[12px] text-muted-foreground">
                        If the Mintable feature is enabled, the owner will be
                        able to mint new tokens until the total supply reaches
                        the maximum supply.
                      </p>
                      {ismint && (
                        <FormField
                          control={form.control}
                          name="maxSupply"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  disabled={loading}
                                  placeholder="Max Supply"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    <Switch
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setIsTax(false);
                        }
                        setIsMint(checked);
                      }}
                      checked={ismint}
                      disabled={istax}
                    />
                  </div>
                  <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <Settings></Settings>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Burnable
                      </p>
                      <p className="text-[12px] text-muted-foreground">
                        If the Burnable feature is enabled, the owner will be
                        able to burn tokens, reducing the total supply.
                      </p>
                    </div>
                    <Switch
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setIsTax(false);
                        }
                        setIsBurn(checked);
                      }}
                      checked={isburn}
                      disabled={istax}
                    />
                  </div>
                  <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <Redo></Redo>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Taxable
                      </p>
                      <p className="text-[12px] text-muted-foreground">
                        If the Taxable feature is enabled, the owner will have
                        the ability to burn tokens, thereby reducing the total
                        supply.
                      </p>
                      {istax && (
                        <>
                          <FormField
                            control={form.control}
                            name="buyTaxfee"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    disabled={loading}
                                    placeholder="Buy Tax Fee"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="sellTaxfee"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    disabled={loading}
                                    placeholder="Sell Tax Fee"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="liqidityShare"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    disabled={loading}
                                    placeholder="Liquidity Share"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="teamShare"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    disabled={loading}
                                    placeholder="Team Share"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </div>
                    <Switch
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setIsBurn(false);
                          setIsMint(false);
                        }
                        setIsTax(checked);
                      }}
                      checked={istax}
                    />
                  </div>
                </div>
                <LoginAnimation></LoginAnimation>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            <div className="w-full px-4">
              <Card
                id="card4"
                ref={card4Ref}
                className="w-full my-4 border-[#05B7D1] rounded-3xl"
              >
                <CardHeader>
                  <CardTitle>Token Logo</CardTitle>
                  <CardDescription>Upload your token Logo.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col w-full">
                    <ImageUpload onFileSelect={setSelectedFile}></ImageUpload>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Button
              ref={card5Ref}
              className="my-4 bg-[#38e5ff]"
              onClick={() => onSubmit}
            >
              Deploy Token
            </Button>
            <Accordion
              type="single"
              collapsible
              className="w-full px-4 curveBg"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <Footer></Footer>
        </form>
      </Form>
    </div>
  );
}
