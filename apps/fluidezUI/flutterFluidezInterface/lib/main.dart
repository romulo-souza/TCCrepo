import 'package:flutter/material.dart';
import 'package:flutter_cpu/widget/grid_lotties.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.dark(),
        scaffoldBackgroundColor: const Color(0xFF232324),
      ),
      home: const AppPage(),
    );
  }
}

class AppPage extends StatelessWidget {
  const AppPage({super.key});

  @override
  Widget build(BuildContext context) {
    final animations = [
      'assets/animations/lottie1.json',
      'assets/animations/lottie2.json',
      'assets/animations/lottie3.json',
      'assets/animations/lottie4.json',
      'assets/animations/lottie5.json',
      'assets/animations/lottie6.json',
      'assets/animations/lottie7.json',
      'assets/animations/lottie8.json',
      'assets/animations/lottie9.json',
      'assets/animations/lottie10.json',
      'assets/animations/lottie1.json',
      'assets/animations/lottie2.json',
      'assets/animations/lottie3.json',
      'assets/animations/lottie4.json',
      'assets/animations/lottie5.json',
      'assets/animations/lottie9.json',
      'assets/animations/lottie7.json',
      'assets/animations/lottie8.json',
    ];

    return Scaffold(body: SafeArea(child: GridLotties(animations: animations)));
  }
}
