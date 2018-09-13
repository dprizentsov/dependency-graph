const CONFIG = {
  N : 100,
  SPECTRUM: [
    // "rgb(222,237,250)"
    "rgb(176,212,243)",
    "rgb(128,186,236)",
    "rgb(77,158,228)",
    "rgb(38,137,223)",
    "rgb(0,116,217)",
    "rgb(0,106,197)"
    // "rgb(0,94,176)"
    // "rgb(0,82,154)"
    // "rgb(0,60,113)"
  ],
  dataSrc : `core=
managedcollections=
coreui=core
classtools=core
newclasstools=
icmp=
geography=
ber= 
dns=
mysql=
tns=
tds=
tinkerpop=core
radius=
ldap= ber
apns= core
http=core
slp=
soap=http
cim= core
asn1=ber core
snmp=asn1 core
ejava=newclasstools
generic-uitools=core
uiutil=core coreui
iconeditor=core coreui generic-uitools
xml=core
denali=core classtools ejava coreui generic-uitools icmp http
denali-ui=coreui denali uiutil
denali-developer=denali-ui iconeditor uiutil
rfidbase=denali http
mdm=apns http denali
jdbc=core denali newclasstools
mdx=jdbc
template=core
xfiles=core
xfiles-lds=xfiles
irio=denali xfiles
devtools=core classtools
rpc=
crypto=rpc
shell=core
telnet=core shell
ssh=core shell crypto
terminals=ssh telnet
sftp=ssh
fcm=ssh
bigdata=
scraper=core
webclient-core=core
webservices-core=core
systemmgmt=snmp slp cim ssh scraper denali
u2base=denali crypto
netflow=core jdbc ber snmp
iseriesbase=
zosdsects=denali
zos=zosdsects
licensing=core denali
powersccommon=
powerscendpoint=licensing snmp powersccommon
netdiscover=licensing denali-ui rpc uiutil core irio ber crypto cim snmp telnet ssh scraper systemmgmt soap geography
u2=netdiscover u2base
iseries=netdiscover iseriesbase
netreach=netdiscover icmp
pinpoint=netdiscover netreach uiutil dns ldap mysql tns tds radius webclient-core webservices-core jdbc netflow zosdsects
webclient=pinpoint template
openkbm=pinpoint
netcurebase=openkbm webclient rfidbase
netcure=netcurebase u2 iseries sftp
saw=pinpoint xfiles-lds
rso=saw
netsleuth=netcurebase
mxx=netcurebase saw zosdsects
acm=mxx
rfid=netcurebase
sge=netcurebase
allcure=saw qm netcurebase mxx
recoveryexpert=qm
auditor=netcurebase
nortelbase=netcurebase
nortelfpm=nortelbase
nortelvpfm=netcurebase
catalant=netcurebase
libdisc=netcurebase
varfacade=netcurebase
titan=netcurebase mxx
pcap=core ber
ncs=rpc pcap
ssl=
packetmon=ssl pcap pinpoint
storage=core cim slp jdbc snmp
snc=denali zos storage crypto template ssh
newton=denali zos storage crypto template ssh tinkerpop webservices-core denali-ui
itm=ncs denali core jdbc
ksx=itm snc
kqq=itm
qm=netcurebase zosdsects kqq
voipcure=netcurebase
mvcure=netcurebase u2
powerscui=netcurebase powersccommon
scala=zos
elk=zos
sg=netcurebase`


}

export default CONFIG;
