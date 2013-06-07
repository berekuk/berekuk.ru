#!/usr/bin/env perl

use strict;
use warnings;

use IPC::System::Simple;
use autodie qw(system);

system(q{ssh ubuntu@berekuk.ru "sh -c 'cd berekuk.ru && git pull'});
