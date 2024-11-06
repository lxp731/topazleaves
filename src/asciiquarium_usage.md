# Asciiquarium Command Install

#### Ubuntu

```bash
sudo apt-get install -y perl libcurses-perl
tar -xf Term-Animation-2.4.tar.gz
tar -xf asciiquarium.tar.gz
cd Term-Animation-2.4/ && perl Makefile.PL && make && sudo make install
cd asciiquarium_1.1/
cp asciiquarium /usr/local/bin
sudo chmod +x /usr/local/bin/asciiquarium
asciiquarium
```

#### Centos

```bash
cd /opt
yum install -y wget
wget http://search.cpan.org/CPAN/authors/id/K/KB/KBAUCOM/Term-Animation-2.4.tar.gz
tar xf Term-Animation-2.4.tar.gz
yum install perl-Curses.x86_64  -y
yum install perl-ExtUtils-CBuilder perl-ExtUtils-MakeMaker  -y
cd /opt/Term-Animation-2.4/  && perl Makefile.PL
make
make install
cd /opt
wget http://www.robobunny.com/projects/asciiquarium/asciiquarium.tar.gz
tar -zxvf asciiquarium.tar.gz
cd asciiquarium_1.1/
cp asciiquarium /usr/local/bin
chmod +x /usr/local/bin/asciiquarium
asciiquarium
```