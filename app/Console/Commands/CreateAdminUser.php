<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:create-admin-user {email? : Admin email} {--name= : Admin name} {--password= : Admin password}')]
#[Description('Create or update an admin user account')]
class CreateAdminUser extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $email = $this->argument('email') ?: $this->ask('Admin email');

        if (! is_string($email) || trim($email) === '') {
            $this->error('Admin email is required.');

            return self::FAILURE;
        }

        $name = $this->option('name');
        if (! is_string($name) || trim($name) === '') {
            $name = $this->ask('Admin name', 'Admin');
        }

        $password = $this->option('password');
        if (! is_string($password) || $password === '') {
            $password = $this->secret('Admin password (min 8 chars)');
        }

        if (! is_string($password) || strlen($password) < 8) {
            $this->error('Password must be at least 8 characters long.');

            return self::FAILURE;
        }

        $user = User::query()->firstOrNew(['email' => $email]);
        $user->name = $name;
        $user->password = Hash::make($password);
        $user->is_admin = true;
        $user->save();

        $this->info('Admin user is ready: '.$email);

        return self::SUCCESS;
    }
}
