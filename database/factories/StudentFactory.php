<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Student;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    protected $model = Student::class;

    public function definition(): array
    {
        return [
            'name'   => $this->faker->name(),
            'age'    => $this->faker->numberBetween(18, 25),
            'email'  => $this->faker->unique()->safeEmail(),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'dob'    => $this->faker->date('Y-m-d', '2007-12-31'),
            'score'  => $this->faker->numberBetween(50, 100),
            'image'  => $this->faker->imageUrl(200, 200, 'people'),
            'user_id'   => User::get()->random()->id, // ✅ integer foreign key
            // 'user_id' => $user->id, // ✅ integer foreign key


        ];
    }
}
