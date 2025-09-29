<?php
require_once('wp-load.php');
global $wpdb;
$tabela = $wpdb->prefix . 'vxcf_leads_detail';
$ticket = '123456';
$rezultat = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM `$tabela` WHERE `value` = %s", $ticket));
echo "Broj duplikata: " . $rezultat;
