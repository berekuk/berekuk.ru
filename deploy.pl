#!/usr/bin/env perl

use strict;
use warnings;

use IPC::System::Simple;
use autodie qw(system);

# copy-pasted from questhub's deploy/ec2_deploy.pl
sub check_local_repo {
    my $git_branch = qx(git rev-parse --abbrev-ref HEAD);
    chomp $git_branch;
    unless ($git_branch eq 'master') {
        die "Error: you should be on master branch to use --magic mode.\n";
    }

    my $git_status = qx(git status --short);
    chomp $git_status;
    if ($git_status) {
        die "You've got some uncommited files:\n$git_status\n";
    }
}

sub main {
    system('git push origin master');
    system(q{ssh ubuntu@berekuk.ru "sh -c 'cd berekuk.ru && git pull'"});
}

main unless caller;
