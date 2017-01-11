function cal_bill()
{
	var nm=document.getElementById("nm").value;
	var add=document.getElementById("addr").value;
	var meter=document.getElementById("meter").value;
	var terr=document.getElementById("tarrif").value;
	var category=document.getElementById("cat").value;
	var unit=document.getElementById("unit").value;
	var flag=0;
	var regulatory=0;
	var fpppa=0;
	if(nm=="" || add==""||meter==""||unit=="")
	{
		alert("All fields are mandatory")
	}
	else
	{
		var regex = /^[a-zA-Z ]{2,30}$/;
		
		if(terr=="sel_ta")
		{
			alert("select Tarrif");
		}
		if(category=="sel_cat"&& !(document.getElementById("cat").disabled))
		{
			alert("select Category");
		}
		if (!(regex.test(nm))) 
		{
			alert("Name contains alphabets only");
			flag=1;
		}
		if(!(/^[ A-Za-z0-9_@./,-]*$/.test(add)))
		{
			alert("Enter Proper address");
			flag=1;
		}
		if(!(/^[0-9]+$/.test(meter)))
		{
			alert("Enter Proper meter no.");
			flag=1;
		}
		if(!(/^[0-9]+$/.test(unit)))
		{
			alert("Enter Proper units.");
			flag=1;
		}
		if(flag==0)
		{
			regulatory=unit*0.18;
			fpppa=unit*0.90;
			var phase_charge=0,tot_charge=0;
			var supp_1=document.getElementById("one_phase").checked;
			var supp_3=document.getElementById("three_phase").checked;
			
			/*Unit Calculation*/
			var unit_charge=0;
			if(terr=="RGP")
			{
				if(supp_1==true)
					phase_charge=25;
				else if(supp_3==true)
					phase_charge=65;
				if(unit<=50)
				{
					unit_charge=unit*3.20;
				}
				else if(unit<=200)
				{
					var nxt=unit-50;
					unit_charge=(nxt*3.90)+160;
				}
				else 
				{
					var nxt_1=unit-50;
					var nxt_2=nxt_1-150;
					unit_charge=(nxt_2*4.90)+745;
				}
				tot_charge=(unit_charge*0.15) + unit_charge + phase_charge + regulatory + fpppa;
			}
			else if(terr=="BPL")
			{
				phase_charge=5;
				if(unit<=30)
				{
					unit_charge=unit*1.50;
				}
				else if(unit<=20)
				{
					var nxt=unit-30;
					unit_charge=(nxt*3.20)+45;
				}
				else if(unit<=150)
				{
					var nxt_1=unit-30;
					var nxt_2=nxt_1-20;
					unit_charge=(nxt_2*3.90)+109;
				}
				else 
				{
					var nxt_1=unit-30;
					var nxt_2=nxt_1-20;
					var nxt_3=nxt_2-150;
					unit_charge=(nxt_3*4.90)+694;
				}
				tot_charge=(unit_charge*0.15) + unit_charge + phase_charge + regulatory + fpppa;	
			}
			else if(terr=="GLP")
			{
				if(supp_1==true)
					phase_charge=30;
				else if(supp_3==true)
					phase_charge=70;
				if(unit<=200)
				{
					unit_charge=unit*4.10;
				}
				else
				{
					nxt_1=unit-200;
					unit_charge=(nxt_1*4.80)+820
				}
				tot_charge=(unit_charge*0.15) + unit_charge + phase_charge + regulatory + fpppa;
			}
			else if(terr=="NRGP")
			{
				unit_charge=unit*4.50;
				if(unit<=5000)
				{
					phase_charge=70;
				}
				else if(unit > 5000 && unit <= 15000)
				{
					phase_charge=90;
				}
				if(category=="com")
					tot_charge=(unit_charge*0.25)+unit_charge+phase_charge;
				else if(category=="industry")
					tot_charge=(unit_charge*0.10)+unit_charge+phase_charge;
				else if(category=="religious")
					tot_charge=(unit_charge*0.25)+unit_charge+phase_charge;
				else if(category=="hostel")
					tot_charge=(unit_charge*0.1125) + unit_charge + phase_charge + regulatory + fpppa;
			}
			else if(terr=="LTP")
			{
				unit_charge=unit*3.30;
				phase_charge=10;
				tot_charge=unit_charge + phase_charge + regulatory + fpppa;
			}
			var stype;
			if(supp_1==true)
					stype="1 Phase";
			else if(supp_3==true)
					stype="3 Phase";
			/*Print*/
			var prt=document.getElementById("print");
			prt.style.display = "block";
			document.getElementById("disp_nm").innerHTML=nm;
			document.getElementById("disp_add").innerHTML=add;
			document.getElementById("disp_meter").innerHTML=meter;
			document.getElementById("disp_tar").innerHTML=terr;
			document.getElementById("disp_cat").innerHTML=category;
			document.getElementById("disp_supply").innerHTML=stype;
			document.getElementById("disp_unit").innerHTML=unit;
			document.getElementById("disp_regu").innerHTML=regulatory;
			document.getElementById("disp_fpppa").innerHTML=fpppa;
			document.getElementById("disp_tot").innerHTML=tot_charge;
		}
	}
}
function ter()
{
	var terr=document.getElementById("tarrif").value;
	var x = document.getElementById("cat");
	var get_index=document.getElementById("cat").options;
	if(terr=="RGP" || terr=="BPL" || terr=="GLP")
	{
		if(get_index[1].text!="Residential")
		{
			var option = document.createElement("option");
			option.text = "Residential";
			x.add(option,"1");
		}
		document.getElementById("cat").selectedIndex = "1";
		document.getElementById("cat").disabled=true;
	}
	else if(terr=="LTP")
	{
		document.getElementById("cat").selectedIndex = "0";
		document.getElementById("cat").disabled=true;
	}
	else if(terr=="NRGP")
	{
		document.getElementById("cat").disabled=false;
		document.getElementById("cat").selectedIndex = "0";
		if(get_index[1].text=="Residential")
		{
			x.remove(1);
		}
	}
}