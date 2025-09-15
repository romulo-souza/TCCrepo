import 'package:flutter/material.dart';
import 'package:flutter_cpu/widget/grid_lotties.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
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

  late final Stopwatch _stopwatch;

  @override
  void initState() {
    super.initState();
    _stopwatch = Stopwatch()..start(); // inicia a medição do tempo

    // Medição do tempo de renderização inicial
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _stopwatch.stop(); // parar a medição do tempo
      debugPrint(
        "Tempo de renderização da MainScreen: ${_stopwatch.elapsedMilliseconds} ms",
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(body: SafeArea(child: GridLotties(animations: animations)));
  }
}
