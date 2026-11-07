/* PC Excel creation. Import drafts share the existing survey lifecycle and IDs. */
(function () {
  'use strict';
  const VERSION = 1, MAX_BYTES = 5 * 1024 * 1024;
  const SHEETS = ['基本信息', '问卷内容'];
  const TEMPLATE_FILE_BASE64 = 'UEsDBBQAAAAIAIdO4kBveQUiYgEAAB0GAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbM2Uy2rDMBBF94X+g9G22EpSKKXEyaKPZRto+gGqNI5N9EIzSZO/r2yngZQ2D5xCNxbW3LnnapA9HK+MTpYQsHI2Z/2sxxKw0qnKznL2Nn1Kb1mCJKwS2lnI2RqQjUeXF8Pp2gMmsdtizkoif8c5yhKMwMx5sLFSuGAExdcw417IuZgBH/R6N1w6S2AppdqDjYYPUIiFpuRxFbfbJAE0suS+FdasnAnvdSUFxTpfWvWNkm4IWexsNFhWHq+igPEfCXXld8Cm7yWOJlQKkokI9CxMVHHl5CQ4jzzqs/0uP8R0RVFJiB4LE1syqAMpUKmPlhCogm3mvWzpApwO/5pR3X0ycYHkTOcDtzZHwleaYykCqFcK8UZiZzr6AEJhCUBGZzveh3LQWsPZAzSmB8gUPypon/3O/MbmAPDDhfm7c/OzTzuumRGVPYLfiJE3S/dT7wbZ+p+YY/BPclz/dQ7e/NxHn1BLAwQKAAAAAACHTuJAAAAAAAAAAAAAAAAABgAAAF9yZWxzL1BLAwQUAAAACACHTuJAezh2vPkAAADfAgAACwAAAF9yZWxzLy5yZWxzrZJNSwMxEIbvgv9hmXs32yoi0mwvIvQmUn/AmMx+sJtMSKa6/feGgmKl1h56TPLOkycvWa4mNxbvFFPPXsO8rKAgb9j2vtXwunma3UORBL3FkT1p2FGCVX19tXyhESUPpa4PqcgUnzR0IuFBqWQ6cphKDuTzScPRoeRlbFVAM2BLalFVdyr+ZEB9wCzWVkNc2zkUm12gc9jcNL2hRzZbR16OXPErkckYWxIN06g+OA5vzEOZoaCOu9yc7/L3O5UjQYuCynCkWYh5Okqfe/3WsWye83baJ04JLS5ZDk1C3pI9rYQhnDK6vaSR2SZh909F+8yXkjr4lvUnUEsDBAoAAAAAAIdO4kAAAAAAAAAAAAAAAAAJAAAAZG9jUHJvcHMvUEsDBBQAAAAIAIdO4kB96BQNUQEAAHsCAAAQAAAAZG9jUHJvcHMvYXBwLnhtbJ2SsUvDQBjFd8H/IdzeXm1FpCQpgoqLWLC6n5cv7UFyF+4+Q+vmoJuzS0E6CA6ljkVB/Geaov+F1xRjqp3c3nfv8fg9OLfVjyMnBW2Ekh7ZqtaIA5KrQMiuR846h5Vd4hhkMmCRkuCRARjS8jc33LZWCWgUYBxbIY1HeohJk1LDexAzU7W2tE6odMzQnrpLVRgKDvuKX8YgkdZrtR0KfQQZQFBJikKybGym+N/SQPEFnznvDBLb57t7SRIJztCu9I8F18qoEJ2DPofIpWXTPQK2GN9mQhvfTbGZAkelHSOu7Pw6cS6YgUWtR1KmBZNIlrHlkesoMaj9bPo4ext+jJ5cWrzlshwta7HtN/KAFatBWnBYvUrYERiBOQnbTOMa4EYZOGcgZcSH1/lwPHsfza+fy5SF+ryfZHfT7PYmm7ysDZz2ALDxZ+E36y86+vNr/C9QSwMEFAAAAAgAh07iQGKigIdXAQAAagIAABEAAABkb2NQcm9wcy9jb3JlLnhtbH2SvU7DMBDHdyTeIfKe2k4/qKw0FR/qRCUkikBsln1tLWInsg1tN+bujPAObDwQIB6DJG3TVlSMp//vfr47Oe7PdRo8gXUqMz1EGwQFYEQmlZn00M1oEHZR4Dw3kqeZgR5agEP95PgoFjkTmYUrm+VgvQIXFCbjmMh7aOp9zjB2Ygqau0ZBmCIcZ1ZzX5R2gnMuHvgEcERIB2vwXHLPcSkM89qI1kopamX+aNNKIAWGFDQY7zBtULxlPVjtDjZUyQ6plV/kcBDdhDU9d6oGZ7NZY9as0GJ+iu+Gl9fVqqEy5a0EoCSWggkL3Gc2OZVaGeW8LasY7yTlFVPu/LA4+FiBPFsknx/P32+vP8v3r5dljP/m8XrDlQNkUEzGVntsktvm+cVogJKIRM2QtEMajShltM0IuS+f3+vfCvX6kf+NnZDSkJyMSJe1ItZq7hg3gqSae/93JL9QSwMEFAAAAAgAh07iQAmW7eNAAQAAhAIAABMAAABkb2NQcm9wcy9jdXN0b20ueG1stZJPT4MwHIbvJn4H0nvpHwaDBVi2AonxoNG5qyGlbCTQElqmi/G7223O6VXjrc3bPu/T5hfPX7vW2YlBN0omgLgYOEJyVTVyk4CnVQFD4GhTyqpslRQJ2AsN5un1VXw/qF4MphHasQipE7A1pp8hpPlWdKV2bSxtUquhK43dDhuk6rrhIlN87IQ0iGIcID5qozrYf+HAiTfbmd8iK8UPdnq92veWl8af8L1Td6apEvCW+SzLfOxDmkcMEkyWMPKiKcQhxnRJWREt8nfg9IfDFDiy7OzTbx/vLLYauVmOTVutxWDROzNr+xdthpRin0JCXfuHLo1IQGJ0CWN0dvijjXe2uWHrH/UkpyHxCnu7yCeLiIQFCwJ/GtIFCzxMps/E+xehyVmIlS0f29LYQXoYW3GSayYpPtbaxfdKdBmf9ANQSwMECgAAAAAAh07iQAAAAAAAAAAAAAAAAAMAAAB4bC9QSwMECgAAAAAAh07iQAAAAAAAAAAAAAAAAAkAAAB4bC9fcmVscy9QSwMEFAAAAAgAh07iQEV4iHX6AAAA1AMAABoAAAB4bC9fcmVscy93b3JrYm9vay54bWwucmVsc72TTWrDMBCF94XeQcy+lu20oZTI2ZRCtq17ACGNLRNbEtL0x7ev2kDiQDBdmKzEe2LefDNCm+330LNPDLFzVkCR5cDQKqc72wp4r1/uHoFFklbL3lkUMGKEbXV7s3nFXlIqiqbzkaUUGwUYIv/EeVQGBxkz59Gmm8aFQVKSoeVeqr1skZd5vuZhmgHVWSbbaQFhp9fA6tHjf7Jd03QKn536GNDShRY80tinAVgtQ4sk4KCzlAP8cvuHRdsbGVC/UUjbnVJM7TmY+yVhKNXiCeJPHsxijmG1JMOXC/toEOnEcbR+15WO1RxMeWWYcg6muDLM8Zn42V+sfgBQSwMEFAAAAAgAh07iQL/aLR6lAgAAyggAABQAAAB4bC9zaGFyZWRTdHJpbmdzLnhtbO1Wz08TQRS+m/g/bNbE6EG2LWoUt8uBhHgx8aAHj0sZ6Cbtbp0ZiHoqarEEKpCA0FaxRX6p0AoSKdsCfwydme6Jf8G3u4jYgJCoxETnsHn73pvv++bNe5tV2x/FY1I/wsSwzLAcbAnIEjIjVrdh9obl+/c6r9yQJUJ1s1uPWSYKy48Rkdu18+dUQqgEe00SlqOUJtoUhUSiKK6TFiuBTIj0WDiuU3jFvQpJYKR3kyhCNB5TQoHAdSWuG6YsRaw+kwIvsPSZxsM+1LHvuCZrKjE0lWrOVIllNli5xlLzfKnI3+yoCtVUxY16Ga6MNpLQIyAPeAjC/UjWdpNjrPiRDWadYlW8nd9Nju/VchcvBAO3grvJAbG8zPL5RnGkXrHFnF3fHgZ7rzbCV96x2qi/kU99aZQ3WLrgZOcOcthgipU2PZyQi2PPNobWeOFFozzIdlKwUeSeA6ZvO8VNwAQbNPiY7uvYAktnfRw+VeCfJ13SSsU/4V4t74H/eEZ8qBBjGbH4yQ9jL4LvwoM8kfr1GBQuKCuaGrFiFpZwb1dY7oQVgOW6cadlUj+vQ48ZXdjwkqM6JmjfH2y96voUD5Rql36ZiG2XGltlJ59yquMnsflVO6uzXT4gOqrOYrXKZoaP1xL6roVC30Pv3WyScceIYItYPVR6oN9GJ5faP/0Rqr5JapTX+fTLpu7X+MQOX6vy5ACzF5pj4tmKSK+K+Vcsv9UcY7VCvTL0L8xSK4Czhad85rUzOy3yJf9q+XSZZSad5JAbncuB4QKms2AA1wEvOMXEEs/MuoJXJ0E8G8jVKx/8tGNn9RDR/1n9g7Pq1Rl6Boy/Yla9sNta0JknVOisVfkdeyo9P7ux3/hZc0f8vX2qT1DdHmGb68JeDInRlaapU+BfRPsKUEsDBBQAAAAIAIdO4kCa6AgvZQkAACBZAAANAAAAeGwvc3R5bGVzLnhtbNVcbY/bWBX+jsR/sFzBB0Qm9vVL7G6S0slMxEq7aKUWCQSochInY+GXrOOUmUVIhW4ZWFSkVYHCshLLrkr5QGdhQWy1u+3+mSZNPvEXuH6/d3ydODPxSxqpsZ37nPOcc557jx170rx2bOjUbdWeaJbZotk9hqZUs28NNHPUor97s1uTaGriKOZA0S1TbdEn6oS+1v7qV5oT50RXbxypqkNBE+akRR85zvhqvT7pH6mGMtmzxqoJPxlatqE4cNce1SdjW1UGExdk6HXAMGLdUDST9i1cNfpZjBiK/ePpuNa3jLHiaD1N15wTzxZNGf2rr45My1Z6OqR6bMuhZbiZMG1ofduaWENnD5qqW8Oh1lcTDFmxbqu3NTc7Mt1umlOjazgTqm9NTadF89Ehyn97dQAPsjTl8+1YA0jjFvUN6so3r1xhblGvuNs/rKF7X39zajmv1Pw379i3blF0nWQXnLfrg/735SN/A3WT+Aj1mvhwAxJcSnB7zLn44gOY9WvXVtvnswUZWk+LM/XzFWTqQXXbzaFlxkUGbuHdI+3m5C3qtqLDacK64/uWbtmUA9UEiXpHTMVQ/RGzs9+8ePbAG3Wk2BM4SXwgx7vHPAkGIw0NCtZz7/vAPQEet/t6KFrq+8q3VS3NAdEWy+C2rtuaomey0KsjVsAWGSXzyGySR7JREBu1R70W3Q3+XZ73tE7mHrhh4L/zblICYLLJYI1DCTqUsmUso8MVzvz4tukMk5WUkAK33Smlrc5lw3vlFp6Qd3iYN65Qb8lZvGVvK8rGwVdDzK1sZIdcfjohzLvrjYMc5x1poidXy/xWlcKi26hRXz4weELKbjewFc7kDuOeABflTBTyj2yj84HL+8lHFiDhR87n7GlFj+4outazczE9e362ePbx8s/3lp+/e/lztKT9zbLjvbln75quR2fvnHuN5h5pN+HloqPaZhfuUMH2zZMxrIkJr2x9O964NaNHtnLCAiE7YGLp2sBlMeqgSoBXOo7mUmT2OFmWG4IgCawMeNaTSC8YrJkD9ViFV0aiHyri5aL+Y5Nczp6QhtLpFOWr05HzzmDoC7ivYnxdF9xXMb464mG3c1hYvRrF+Trcl/PWYTS7C3ITLSINuIhIrChJksxzbPH+Behf5iRZBJAGk7dUA/+FuSk3zULpaS6pVwX+xaLclFtmseQyiyWXuVGUm3LL3Ci5zI2SyywV5abcMksll1kqucyFuSm3zHLJZZa3VmbvDV5A9yx7oNrRJTTL0OGxdlNXhw7E29royH13rLHrxHIcy4AbA00ZWaaiux5CBIqkvLvGLdo50kw6/AJAmTpW8AVM3R0UWF871hvlUVg7FI4JWa4d6w+7YCzBlcY+cF+ZIkoi1sSVBKyLLonIGmNKpUMvhjrQpgZ97isuvggXkeZ5d87zDZ5p8AIQNwtvVbbi+0FZS4ggspUQAWQsIYLYRozxvYysMSKIbDEigIwxIohNYxxY056ubhblWkwyzrUQQqRrMVuaL2Q/3q3izZY33A+xYNh8Xx9z5uUh2ICdqK/q+g3X2PeG8UM37vMYx0PkoRHGfWbEjDZhEws2fTv+Trup6NrINFTTcZ93crS++w1yH+6q/hf4x8NzZv1nXdbZpZTxWD/pWt5qFO7BofHevjc63r8e8ogPvWFbjtp3vGewLkSV3xmq8s4w9R/k2g2qYGeoIpNVXMP0O1Ojp9pd73GwajBu7BxjRA08yhisZoxpJF+G0s7lVN45xuy6RaGClNkUytwGlHOmCKpPkUuhyFefYoW1yceUBZSysJJyzqSEmJSIkhLLJCWmkCo1U0gbb6CkGmWSSuuDUnVmalrjkytDESCNTsq+mBS7fACktcmVJYk0N3aDdblglkjzcM8YKsoS6RfuScMOsOQqyxKpeHVTicqSryxLtODCTrAUK8sSrXhjJ1hWtz+iFa9ug0RYgp1okKC6DRJlWd1VHa14dRskyrK6vQeteHV7D8qyur0HrXh1ew/Ksrq9B614dXsPwpKrbu9BKs5Vt/egLKvbe9CKl9576uiNef82PXKHHl7iXuQOPXU89De2dcMrzX4iEyzm8siytbegNcTpBb4rS79KxWn4t9pY7Lsy9iIUf2Ir45vqsRM+x5aR3eokFceOly9AD9c8W2ZK0+4F5ZbSdYRWfE+SU40Tk2SjBK64DVQdvqhKMxPOWaWXSzva/dAo2E3SHnaZEvgLO86/oH5F5FQPGjfyoB3+mF10mHL/KLtFz54+XTx+G2HWm2q6o5n+Xp0AuH/3xbP7s1/9cvne70IYi8E4Emzxn8ezpz8PAQAD8CTAyz89h07mH0dOOAwjrOP2A+ZHIZLHkGI6PQQjYJgGEfPfe8sHz+e/fRRiRAwjERl++sni7Mvlw7OX772dwDcwvEzCz//99+XpOyFAwgAssV6LJ3+bvfvO/A+n8/f/EeJkHMcSPX1wuvzwj1GFcWWwxPQvHn8Eyc3vPMa9sbg8BKI+fHdUNMdZXCIssWoBCEQgXCMssWwBiItAuDxYYt0CEB+BcH2wxGItnj+Y3Yuqy+LyAORqQcjpZxEEVwQgFmpx9teXZw8jCK4JAIjRfHRn/pdHs/u/n927O//giwiL6wIQC+VLNoEFuEAAcU7P/3U6v/N5BMF1AchT+tGzaDwuCUCUxOzTs2g8rgZAVMPyzi9ePH0SQXAtAPIc/uKzxT/vQo3Pnjxcfvj+4tefxLIFuC4AUReA+RpVo1aawbXCEbXCrzeD64cj6kdcbwbXFEfUFMFANC8BLiyOKKzUrERmOFxjHFFjqVmJzZxrV0TdpWYlNoPLkSPLMWkgWng4XJ8cUZ+pWYnN4JrliJpNzUpsBlcuR1RualZiM7hyefI5RNJAtLJyuGZ5omZTsxKbwTXLEzWbmpXYDK5cnqjc1KxEZnhcuTxRuQQDQmQA1yxP1GxqVmIz5068iJpNzUpsBlcuT1RualZiM7hy+ayrrRgZwDXLb7baxmZwzQqbrbaxGVy5wmarbWwGV67g/wFcfDrfbjrur+Hi5/ZQXwN1qEx152b0YYuOt1/3/ugORKPe0G5bTjAq3n7N/fMg/1QLXle8NnG8d2pqay36p4f7DfngsAtqErMv1XhOFWqysH9QE/jO/sFBV2YA0/lZ9PO8LH+xn+dl5Lrs/4QwvMBi+asTHY6yg2AD8jfiYy0a2fHpe+mCtP3/vSDq8U8bt/8PUEsDBAoAAAAAAIdO4kAAAAAAAAAAAAAAAAAJAAAAeGwvdGhlbWUvUEsDBBQAAAAIAIdO4kCE+vsMRgUAAL4YAAATAAAAeGwvdGhlbWUvdGhlbWUxLnhtbO2ZzY8TNxTA75X6P1hzh5lMMklYkUX5hJZdWJEFxNGZcWZMPPbI9uySWwXHSpWq0qqXSr31ULVFAqkX+tdsS9VSiX+hng8m48RhWUCq2pLDrj9+7/k9v+fnmeTipXsxAUeIC8xoz2qcdyyAqM8CTMOedfNwcq5rASEhDSBhFPWsJRLWpd0PP7gId2SEYgSUPBU7sGdFUiY7ti18NQzFeZYgqubmjMdQqi4P7YDDY6U3JrbrOG07hphagMJYqb19MLV2X+ocE/WHSpEN+IRP/XwhHQwWjeyfWIoh4eAIkp6ldAfs+BDdkxYgUEg10bOc/GPZuxftSojILbI1uUn+KeVKgWDh5nI8nFWCrZbXavcr/W6hf5Mbd8btcbvSlwPQ95WbjU2d3U5rOCjZGlQ0DbrHXdedaHxNf3ODn7iDvuNqfHPFtzb4jjcYtXS+teK9Db7pDJ1BS+O9Fd/etN9rDb2xxudQRDBdbNCO47bHXklXyJyRK0a8M25M+qMSX1F2LbUKeSqNiRbDu4xP1GweWSgxBXKZoDn0FTSEBM84Bns4jGS2BtxBsDZfDPliYyhbDgif40T2rI8TqA7CCnnx9IcXTx+DF08fndx/cnL/55MHD07u/2QQvAJpWBd8/t3nf33zCfjz8bfPH35p5kWd/+3HT3/95QszKOvgs68e/f7k0bOvP/vj+4cGvM/hrI4f4hgJcA0dgxssVr4ZFkAzfjaJwwhiTQJGijSAYxlp4LUlJCZugPTNu8VVDTCBl9O7mq3TiKcSG8CrUayB+4yRAeNGd65ma9XdSWloXpynde4GhEemtYdroR2niUpmbFI5jJBm5gFR0YYhokiCbI4tEDKI3cFY29d97HMm2FyCOxgMIDZuySGeSbPQFRyruCxNBqpQa3uzfwsMGDGpH6EjnVQHAhKTSkS0bbwMUwljo8UwJnVyD8rIZOR0yX1tw4VUkQ4RYWAcICFMMtf5UjP3qiof5rDvk2Wsk1zihYncg4zVyRFbDCMYJ0abMY3q7EdioVIUggMmjUYw/YRkfRUHSLeG+xZG8mzH+qaqnOYEyWZSbjoSiOnncUnmENGyxGv1Osb01OL9vmy/xPscGw/PerHexv0LS/QIpvQAqVPxvkK/r9D/xwq97Sy/+7q8KsV2/XE7VxObn73nmJCpXBK0J/IKLpRvwUQN5p1conrOTyLVLNfSuJDDVVuUmkIBEibUy4S1VVV+ZaTx9fm8GG10vOpFshLIe6Goq2wUb5ynmJjJ2DWDVJoBmL1zu51CXm0rJCjITCwl6n68hU9RiiqfzrmeW3s//mfdsjcDTqjeA8fKkEyVBXyY9Ky5utNVM06UQpEdBUhC2rN8Wbj6RvmScCFHUEQFlk8VyR5jiTggOO5Z3fq3CoT+94x7ZwnWcp1/KMEahnPzRttnr+chms+RL7eMrLrlHEuV6mkUHIMZSfkNmJnmNNqZqQEWqm56TrfocNVulV6swgE4k7exjKYRTNCpmw9JEsFisL114yuT8l7NWnuLK2bPOJoT1cOMAiH7mSO56YgG/exLoKJ5kMW2VcwU/rqZk+v+iqVKlobm/Ixs+m6/ncWGWHidhleZ1rjgeGcOhf7lVJXE9Ug0a5Eo8LPFwTYl3SycvIv78XShbEK9Osli7IJXOqNoKPdZ8PJ63Jpuxut4bS8b1puUmppVTbNVnrMaj2CASrpbjaorfkU77uvVKu/VpWrNtK7ZtKbZNGeLac3XM+20Mrq2XHvLvr36scBYgVdn+VVX/HrW2rXHv7y38RMAm91VmT9ST5UpkcJeQbt/A1BLAwQUAAAACACHTuJAN54+f6wCAAAwBgAADwAAAHhsL3dvcmtib29rLnhtbK1Uy27TQBTdI/EPlveJH0naxopT5WVR1FRVGlqQKqGJPYlHHc+YmTFuhViwgAUS3bJBqliwQ0VdIdj0Z3BV/oKxHaemZWEQm5m543PPPfdc253N4wArzyHjiBJbNeq6qkDiUg+Rha0+mjq1DVXhAhAPYEqgrZ5Arm5279/rxJQdzSg9UiQB4bbqCxFamsZdHwaA12kIiXwypywAQoZsofGQQeBxH0IRYM3U9TUtAIioOYPFqnDQ+Ry5cEjdKIBE5CQMYiCkfO6jkBds3iwrtOKM4aweh7zuEg2meaahLSFFRuBWERAAdhSFNZcGoSw6QxiJk0yGqgSutbUglIEZlkYdG62CWR7vUAfIZZTTuahLqmVbdxwydM0wcpO6nTnCcD8flALCcAcEaRWsKhhwMfKQgJ6tNmRIY3hzIUWwKOxHCMug3dBNVeuuZrfLZCBl97CAjAABB5QI6et/ciTjHvhUtqZM4LMIMchzY7oduQLXAjO+C4SvRAzb6tA6fAg5P0wuLq4/XV6/PU/OTpPTy8OSjeCuor8wErhp89pKVH6+3Xy3k1qzj2DMb5xKQyVGxKPxAfKEL5029TVpbn73AKKFL182o7lutrIiJY5MRrErJJtbcvb96sPnH5cfr159kR9Y+mRLDsiQ07KQPLAtz0h5yjk/358n774mb14n599KOc1Sjnk7Zy89N0roRgndyJQW8lyA3V2mpFsmpW3oZjtFwGOxzUW2y0EhW33Rb2309UbbrDUdw6k1jbZe6/fXmrXW0Gm01o3hYNRyXq7GljLO/3FuG1qWDYGI5MuTvjdZbKWrs7xdXS5hy9Z/K2BNhmkrFYB78s+HYUWws18RONgZT8cVsduj6dMDpyq4N+4Pe9Xxvcmk92Q6elyU0P5oqCZnna/Z5LXiM+j+AlBLAwQKAAAAAACHTuJAAAAAAAAAAAAAAAAADgAAAHhsL3dvcmtzaGVldHMvUEsDBBQAAAAIAIdO4kAb0iKAygMAABEJAAAYAAAAeGwvd29ya3NoZWV0cy9zaGVldDEueG1spZZbb+NEFMffkfgOlt/Xji+bJlGS1TYhtBVIK8rleepMklFtj5mZJC1P1d4E4vbAAtJSsSBYwQNaLhKsWgr7YWjS9qlfgTMz8SVuHyKQrNb+zzm/Of+Z43Gat/ai0JhgxgmNW6ZjVUwDxwHtk3jYMt96s3ejZhpcoLiPQhrjlrmPuXmr/fJLzSllu3yEsTCAEPOWORIiadg2D0Y4QtyiCY5hZEBZhAQ8sqHNE4ZRXyVFoe1WKlU7QiQ2NaHBVmHQwYAEuEuDcYRjoSEMh0hA/XxEEp7S9vor8foMTcFrWk+hxK4eyXiOf4UXkYBRTgfCCmi0KO2qy7pdX/IZBasUFiG2O05uADgBczskJGJf1ZhisMg50+nUmibcCuKrC+Ss2Vh0xlzQqIsEMttNVdsdZrebfQJBcusNhgct87bT2PJNexHxNsFTXrg3BNrZxiEOBO5Dq5iGbIEdSnfl4CZIFclWAZKI4N8Ed3AYtsx1H7roXTXHuprAzqjF+3S2nlqHO8zo4wEah6JDw3dIX4xaZt1MtTfodAOT4UhAKb4F1dCxCEmMX8MTHMJgy/TkRAENufprRCRWVUdoT1evie6aVXPq+SXbfT/EKiRQq7aY2lngNMhdgNwc5FoVdy27VuR4C46Xc+pWreLk14ogP3VW9Wp+BqsXsuWy6+XQ/Q3N0G4yOjWYYsuV9HzLvQkpCZJvtNNw5JYGMuA2RHBlF8I4qJN2pWlPJHIRsZ5G2AuhUxa6WvAy4ZWy0NOCnwmvloUNLdzMhM2ysFUQbLCXeXS1x7qfrmPWP9c7dhWnWnDslBynEZnjstDVwlruuCz0tFDLHZeFjXLKZlnYKghLjj3t2Kla3vUWPZVYL1h0SxZ1BKTkId5ySOeaED8LWarHX65CFVetXN2OtDxfkx1FJrF8vbcFg2ECTaw+PA3gBdDdcOZyzCbYbM+e/TH/5tv5b08uDh7P7z2YPfz9/Jd78ydPL0/eP/v++PTvDy9PPmjaAiqTkNzo/53rGmbnvzDnhz9dfPls9vHzs0c/nh5/cnr88PyH72Cii89fzH4+WnL3xdHs5NOzx/cvDg/mv969PPlIOz3787P514c6ff7o6PzFV8Ws2fOnp38d/nNwd7lgvU924WSIMBuq45sbAR3HQr5ABTX7YnTUyVLW3UZHvfh2jmk3EzTEryM2JDE3QjwAZMWCg5LpfVf3gibqDk6hHSqgK9KnEXxUMZNP0G8DSkX6YGvuNhbjxEhQgtk2eQ+rrqaMwDdQ/TaAJaZMMESETNCwnqLIIrMfM+1/AVBLAwQUAAAACACHTuJAcn+ceWoEAAD6CgAAGAAAAHhsL3dvcmtzaGVldHMvc2hlZXQyLnhtbKWW72/bRBjH31fif7D8glfMjh2n+UGSqUvWrSuTJgrj9dW5JFZtn3d3iVteVfwYQ2JagQ2hwtQB0jaGyibYEIWK/TN12r7iX+DxXew4bl5ERbKSu+8997nnee5n/eKm5ypDTJlD/IZqaAVVwb5NOo7fa6jvv7d8oaIqjCO/g1zi44a6hZl6sfnGQj0kdIP1MeYKEHzWUPucBzVdZ3Yfe4hpJMA+tHQJ9RCHKu3pLKAYdUQnz9XNQmFR95Djq5JQo/MwSLfr2LhN7IGHfS4hFLuIg/+s7wQsoW125uJ1KAoh1sSfjItt2ZLyDOsMz3NsShjpcs0m3ti1s1FW9epUnJ49j2MeohuD4AKAAwhu3XEdviV8TDCYTzhhGGphwDTbP5sgo6xj3howTrw24kht1oVvN6jerHccMIqnXqG421CXjNqqpepji5sODlmmrMRTvk7IRlxZ6TTUQszCLrbj5CsI/oa4hV23obaNIiybWwIalwGpp5xsOeEvi8hvUKWDu2jg8hZxP3A6vN9Qq2qivUvCq9jp9TmsU0szVIUMuOv4+B08xC40NlQxkE1cJn4Vz4mXtKp4aFP8h5JolrWKUZ188QLfcrEwsUWexkMbY5wEmWOQOQGZWsEsp9+cnOKYU0w5RkmrlErpV50TZI1B1sShklauFNNv3shKSYoWi5UJLOtGPH8yr3JrwDpq1ikJFSrY8ZQULc0EEAtQfBgYNcOA1WHHBktgwUTewIyBOmwW6vowRo4tLiUW+lho5YV2XrgshWIqLOeFK1KwUuFqXliRQikVruWF1YygQ7xp0KYMumoliU1X5uwUmIKzmElBJZeCxCJNQV5o54XLUihPUpAXrkihMklBXljJd7mWF1YzwlQKijIFxqJWnB1zUXSsZmKu5mKWFkYhY2LklkZrlo0xbdOeZWOmNlNeW9O+ihDKhbOzmARhSbQh0I4fnzdrnEKzA5tB3H014NmwS+DYZ5gOsdqM7j443f68rnMYOzabBHwe2uijp6PvXkbb/0Q7X55u7568/iz6+tnxk7ujbw6iw3tHf90+efJTtP9ztL8Tff909OiH491Pov3HRwePoq++OL6/N3r59+jjT6Pbr/493JvhUutcLn37fAaqfa5c/frH6YPXR4e7C8f3X508fzj6bQ+CXAAZQpGV6OD36N6LhaM/n0V3fjl9+OPJizvTo8sJ1jNHk4dpT1xFTLHJwOfxhs2o6W3XFkdbXjdrbXHQ6BMMXJUAvolcpyOfGlnudJOCXJeEl1zkb8jjoE/CFT8Y8OuYMdTDqXiZUkKnRHlhLhWVljjGcly+FYCd6zCu/u8xWkatZSotq9YyClalVF6EMOLXx8BFRvPNWwPC34ZJfivaeSwrdT1trevTfp0RIFkBDHcd0Z4DiXJxF/JU0OB+pHJ3iTIngSjBnbFOOOy9pNaH1xOmcQ22dZcQnlR0yV3DfBAoAQowXXM+xOKEIdSBx44YHRYXoZwih8cdJGxZUOIZTV+tzf8AUEsDBBQAAAAIAIdO4kAABB1jqwEAAGkDAAAYAAAAeGwvd29ya3NoZWV0cy9zaGVldDMueG1sjZPBbtswDIbvA/YOgu61na1blyJOMSQItsOAYt3Ws2LTthBJ1Cimbvf0k+U4TZFLTiZF8cP/k/Li7tka8QQUNLpSzrJCCnAV1tq1pfz9a3P1RYrAytXKoINSvkCQd8v37xY90i50ACwiwYVSdsz+Ns9D1YFVIUMPLlYaJKs4ptTmwROoOjVZk38ois+5VdrJkXBLlzCwaXQFa6z2FhyPEAKjOOoPnfZhoj3XF/FqUn30Ouk5kbgeK0fe7PqMZ3VFGLDhrEJ7kHbucp7P3/i01SXCrKLd3l9FsI/mttpofkkaJwzwK6fv+6z3Iavc+YBmNznwah8Y7VqxkstF0nZP+XJR63hpWL0gaEr5dSbzQ/mPhj6cxGLY9xZxNyTf61IWAwgMVMPkhYqfJ1iBMYkiwt8TYH6knMYTfZNM35OooVF7wys0j7rmrpRzOZ39xP4b6Lbj+ESvs1eVg6EYe9XCD0WtdkEYaOKtIruRgsaOFDP6FH2SYoscZzFlXVwW0JB9lKJB5Ck5cB+A91545YEe9D9IqpB0nG16c6X0SExK89AwwjaJMhg//iTL/1BLAQIUABQAAAAIAIdO4kBveQUiYgEAAB0GAAATAAAAAAAAAAEAIAAAAAAAAABbQ29udGVudF9UeXBlc10ueG1sUEsBAhQACgAAAAAAh07iQAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAQAAAAkwEAAF9yZWxzL1BLAQIUABQAAAAIAIdO4kB7OHa8+QAAAN8CAAALAAAAAAAAAAEAIAAAALcBAABfcmVscy8ucmVsc1BLAQIUAAoAAAAAAIdO4kAAAAAAAAAAAAAAAAAJAAAAAAAAAAAAEAAAANkCAABkb2NQcm9wcy9QSwECFAAUAAAACACHTuJAfegUDVEBAAB7AgAAEAAAAAAAAAABACAAAAAAAwAAZG9jUHJvcHMvYXBwLnhtbFBLAQIUABQAAAAIAIdO4kBiooCHVwEAAGoCAAARAAAAAAAAAAEAIAAAAH8EAABkb2NQcm9wcy9jb3JlLnhtbFBLAQIUABQAAAAIAIdO4kAJlu3jQAEAAIQCAAATAAAAAAAAAAEAIAAAAAUGAABkb2NQcm9wcy9jdXN0b20ueG1sUEsBAhQACgAAAAAAh07iQAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAQAAAAdgcAAHhsL1BLAQIUAAoAAAAAAIdO4kAAAAAAAAAAAAAAAAAJAAAAAAAAAAAAEAAAAJcHAAB4bC9fcmVscy9QSwECFAAUAAAACACHTuJARXiIdfoAAADUAwAAGgAAAAAAAAABACAAAAC+BwAAeGwvX3JlbHMvd29ya2Jvb2sueG1sLnJlbHNQSwECFAAUAAAACACHTuJAv9otHqUCAADKCAAAFAAAAAAAAAABACAAAADwCAAAeGwvc2hhcmVkU3RyaW5ncy54bWxQSwECFAAUAAAACACHTuJAmugIL2UJAAAgWQAADQAAAAAAAAABACAAAADHCwAAeGwvc3R5bGVzLnhtbFBLAQIUAAoAAAAAAIdO4kAAAAAAAAAAAAAAAAAJAAAAAAAAAAAAEAAAAFcVAAB4bC90aGVtZS9QSwECFAAUAAAACACHTuJAhPr7DEYFAAC+GAAAEwAAAAAAAAABACAAAAB+FQAAeGwvdGhlbWUvdGhlbWUxLnhtbFBLAQIUABQAAAAIAIdO4kA3nj5/rAIAADAGAAAPAAAAAAAAAAEAIAAAAPUaAAB4bC93b3JrYm9vay54bWxQSwECFAAKAAAAAACHTuJAAAAAAAAAAAAAAAAADgAAAAAAAAAAABAAAADOHQAAeGwvd29ya3NoZWV0cy9QSwECFAAUAAAACACHTuJAG9IigMoDAAARCQAAGAAAAAAAAAABACAAAAD6HQAAeGwvd29ya3NoZWV0cy9zaGVldDEueG1sUEsBAhQAFAAAAAgAh07iQHJ/nHlqBAAA+goAABgAAAAAAAAAAQAgAAAA+iEAAHhsL3dvcmtzaGVldHMvc2hlZXQyLnhtbFBLAQIUABQAAAAIAIdO4kAABB1jqwEAAGkDAAAYAAAAAAAAAAEAIAAAAJomAAB4bC93b3Jrc2hlZXRzL3NoZWV0My54bWxQSwUGAAAAABMAEwCTBAAAeygAAAAA';
  const FILE_STYLE_HEADERS = {基本信息: ['问卷名称(必填)', '问卷类型(必填)', '问卷说明'], 问卷内容: ['题目类型(必填)', '题目标题(必填)', '是否必填(必填)', '选项(必填)']};
  const HEADERS = {基本信息: ['字段', '内容'], 问卷内容: ['题号', '题型', '题目标题', '是否必填', '选项'], 填写说明: ['填写项目', '规则与示例']};
  const LEGACY_BASIC_HEADERS = ['字段', '内容', '填写要求', '填写示例（不导入）'];
  const LEGACY_TEMPLATE_HEADERS = ['题号（必填）', '题目类型（必填）', '题目标题（必填）', '是否必填（必填）', '选项（单选、多选必填）'];
  const LEGACY_COLUMN_HEADERS = [...LEGACY_TEMPLATE_HEADERS.slice(0, 4), ...Array.from({length: 20}, (_, index) => `选项${index + 1}（${index < 2 ? '选择题必填' : '非必填'}）`)];
  const TEMPLATE_HEADERS = {基本信息: ['字段', '内容', '填写要求'], 问卷内容: [...LEGACY_TEMPLATE_HEADERS.slice(0, 4), ...Array.from({length: 20}, (_, index) => `选项${index + 1}${index < 2 ? '（选择题必填）' : ''}`)]};
  const BASIC_FIELD_NAMES = {'问卷名称': '问卷名称', '问卷名称（必填）': '问卷名称', '问卷类型': '问卷类型', '问卷类型（必填）': '问卷类型', '问卷说明': '问卷说明', '问卷说明（非必填）': '问卷说明'};
  const TYPES = ['填空', '单选', '多选', '日期', '文件/图片', '签名', '位置'];
  const clone = value => typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value));
  const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character]));
  const errorRow = (sheet, row, column, message) => ({sheet, row: row || '', column: column || '', message, field: column || '', reason: message});
  const imported = survey => survey?.creationSource === 'excel' && survey.excelImportVersion === VERSION;
  let dialog = null, generation = 0, transactionDepth = 0, installed = false, restoring = false, loadAdapter = null, creationSessionId = null;
  const persisted = new Map();

  function track(event, details = {}) {
    const record = {event: event.startsWith('survey_') ? event : `survey_${event}`, portal: state.portal, device: state.preview, org: CONFIG[state.portal]?.org || '',
      user_id: typeof currentRecipientPersonId === 'function' ? currentRecipientPersonId() : '', template_version: 'V1.11', timestamp: typeof formatSystemTime === 'function' ? formatSystemTime() : new Date().toISOString(), ...details};
    window.__surveyExcelEvents = window.__surveyExcelEvents || [];
    window.__surveyExcelEvents.push(record);
    return record;
  }
  function storageKey(portal = state.portal) {
    const config = CONFIG[portal];
    if (!config) throw new Error('当前组织不可用');
    return `survey-excel-v111:${portal}:${encodeURIComponent(config.org)}:${encodeURIComponent(config.user)}`;
  }
  function owns(survey, portal) {
    return imported(survey) && survey.owner === CONFIG[portal]?.user.split(' · ')[0];
  }
  function serialized(portal, records = CONFIG[portal].surveys.filter(survey => owns(survey, portal))) {
    return JSON.stringify({version: VERSION, portal, org: CONFIG[portal].org, user: CONFIG[portal].user, records});
  }
  function persistAll() {
    if (restoring) return;
    const changes = Object.keys(CONFIG).map(portal => ({portal, key: storageKey(portal), value: serialized(portal)}))
      .filter(item => item.value !== persisted.get(item.key) && (CONFIG[item.portal].surveys.some(survey => owns(survey, item.portal)) || persisted.has(item.key)));
    const written = [];
    try {
      changes.forEach(item => {
        const previous = localStorage.getItem(item.key);
        localStorage.setItem(item.key, item.value);
        written.push({...item, previous});
      });
    } catch (error) {
      written.reverse().forEach(item => { try { item.previous == null ? localStorage.removeItem(item.key) : localStorage.setItem(item.key, item.previous); } catch {} });
      throw new Error('草稿保存失败，请检查浏览器存储空间后重试');
    }
    changes.forEach(item => persisted.set(item.key, item.value));
  }
  function restorePersisted() {
    restoring = true;
    try {
      Object.keys(CONFIG).forEach(portal => {
        const key = storageKey(portal);
        let raw;
        try { raw = localStorage.getItem(key); } catch { return; }
        if (!raw) return;
        try {
          const saved = JSON.parse(raw);
          if (saved.version !== VERSION || saved.portal !== portal || saved.org !== CONFIG[portal].org || saved.user !== CONFIG[portal].user || !Array.isArray(saved.records)) throw new Error('schema');
          const ids = new Set();
          const rows = saved.records.filter(survey => {
            const valid = owns(survey, portal) && Number.isSafeInteger(survey.id) && survey.id > 0 && !ids.has(survey.id)
              && ['draft', 'not_started', 'running', 'paused', 'ended'].includes(survey.status)
              && typeof survey.title === 'string' && Array.isArray(survey.questions) && survey.questions.length > 0 && survey.questions.length <= 100;
            if (valid) ids.add(survey.id);
            return valid;
          });
          rows.forEach(savedSurvey => {
            const index = CONFIG[portal].surveys.findIndex(survey => survey.id === savedSurvey.id);
            if (index < 0) CONFIG[portal].surveys.unshift(clone(savedSurvey));
            else if (owns(CONFIG[portal].surveys[index], portal)) Object.assign(CONFIG[portal].surveys[index], clone(savedSurvey));
          });
          persisted.set(key, serialized(portal));
        } catch {
          track('excel_draft_restore_failed', {restore_portal: portal, reason: 'invalid_storage'});
        }
      });
    } finally { restoring = false; }
  }
  function snapshot() {
    return {state: typeof structuredClone === 'function' ? structuredClone(state) : cloneState(state),
      records: Object.fromEntries(Object.entries(CONFIG).map(([portal, config]) => [portal, config.surveys.map(survey => ({reference: survey, value: clone(survey)}))]))};
  }
  function cloneState(value) {
    if (value instanceof Map) return new Map([...value].map(([key, item]) => [key, cloneState(item)]));
    if (value instanceof Set) return new Set([...value].map(cloneState));
    if (Array.isArray(value)) return value.map(cloneState);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, cloneState(item)]));
    return value;
  }
  function rollback(saved) {
    Object.keys(state).forEach(key => { if (!Object.hasOwn(saved.state, key)) delete state[key]; });
    Object.assign(state, saved.state);
    Object.entries(saved.records).forEach(([portal, rows]) => {
      rows.forEach(({reference, value}) => {
        Object.keys(reference).forEach(key => { if (!Object.hasOwn(value, key)) delete reference[key]; });
        Object.assign(reference, value);
      });
      CONFIG[portal].surveys.splice(0, CONFIG[portal].surveys.length, ...rows.map(row => row.reference));
    });
  }
  function transaction(action, rethrow = false) {
    if (transactionDepth) return action();
    const before = snapshot(), messages = [], originalToast = toast;
    transactionDepth++;
    toast = message => messages.push(message);
    try {
      const result = action();
      persistAll();
      toast = originalToast;
      messages.forEach(message => originalToast(message));
      return result;
    } catch (error) {
      rollback(before);
      toast = originalToast;
      track('excel_draft_save_failed', {reason: 'storage_or_save'});
      if (rethrow) throw error;
      if (state.portal) renderShell();
      originalToast(error.message || '草稿保存失败，请重试');
      return false;
    } finally { toast = originalToast; transactionDepth--; }
  }
  function macroWorkbook(book) {
    return Boolean(book?.vbaraw?.length
      || Object.values(book?.Sheets || {}).some(sheet => sheet['!type'] === 'macro')
      || (book?.keys || Object.keys(book?.files || {})).some(key => /vbaProject|macrosheets|xl\/intlmacrosheets/i.test(key)));
  }
  function installLoadAdapter() {
    if (typeof loadEditableSurveyState !== 'function' || loadEditableSurveyState === loadAdapter) return;
    const baseLoad = loadEditableSurveyState;
    loadAdapter = function (survey) { const result = baseLoad(survey); if (imported(survey)) state.draftDescription = survey.description || ''; return result; };
    loadEditableSurveyState = loadAdapter;
  }
  function readRows(sheet, name, width, errors, metadata = new Set()) {
    const rows = new Map(), cells = Object.keys(sheet || {}).filter(key => /^[A-Z]+[1-9][0-9]*$/.test(key));
    if (cells.length > 20000) { errors.push(errorRow(name, '', '', '工作表内容超出模板容量')); return []; }
    cells.forEach(address => {
      const cell = sheet[address], coordinate = XLSX.utils.decode_cell(address), value = cell?.v == null ? '' : String(cell.v).trim();
      if (cell?.f) errors.push(errorRow(name, coordinate.r + 1, address.replace(/[0-9]/g, ''), '不支持公式，请粘贴为文本或数值'));
      if (metadata.has(address)) return;
      if (!value) return;
      if (coordinate.c >= width) { errors.push(errorRow(name, coordinate.r + 1, address.replace(/[0-9]/g, ''), '存在模板以外的列，请使用下载模板')); return; }
      if (!rows.has(coordinate.r)) rows.set(coordinate.r, Array(width).fill(''));
      rows.get(coordinate.r)[coordinate.c] = value;
    });
    return [...rows].sort((left, right) => left[0] - right[0]).map(([index, values]) => ({row: index + 1, values}));
  }
  function templateMetadataCells(book) {
    const cells = new Set(), sheet = book.Sheets.基本信息;
    for (const [name, column, heading] of [['SurveyImportTypes','AA','问卷类型选项'],['SurveyQuestionTypes','AB','题目类型选项'],['SurveyRequiredValues','AC','是否必填选项']]) {
      const names = (book.Workbook?.Names || []).filter(item => item.Name === name && item.Sheet == null);
      if (names.length !== 1 || String(sheet[`${column}1`]?.v || '') !== heading) continue;
      const ref = String(names[0].Ref || '').replace(/^=/, ''), match = ref.match(/^(?:'基本信息'|基本信息)!\$?([A-Z]+)\$?2:\$?([A-Z]+)\$?([0-9]+)$/);
      if (!match || match[1] !== column || match[2] !== column || Number(match[3]) < 2 || Number(match[3]) > 20000) continue;
      for (let row = 1; row <= Number(match[3]); row++) cells.add(`${column}${row}`);
    }
    return cells;
  }
  function parseWorkbook(book, options = {}) {
    const portal = options.portal || state.portal, errors = [];
    if (!CONFIG[portal]) return {ok: false, errors: [errorRow('文件', '', '', '当前端不可用')]};
    if (macroWorkbook(book)) return {ok: false, errors: [errorRow('文件', '', '', '不支持含宏的 Excel 文件，请使用无宏模板')]};
    if (!book || !Array.isArray(book.SheetNames) || ![2,3].includes(book.SheetNames.length) || new Set(book.SheetNames).size !== book.SheetNames.length || SHEETS.some(name => !book.SheetNames.includes(name) || !book.Sheets?.[name]) || book.SheetNames.some(name => ![...SHEETS,'填写说明','Sheet3'].includes(name))) {
      return {ok: false, errors: [errorRow('文件', '', '', '模板结构错误，必须包含“基本信息”“问卷内容”；兼容保留“填写说明”的旧版模版')]};
    }
    if (book.SheetNames.includes('Sheet3') && (!book.Sheets?.Sheet3 || Object.entries(book.Sheets.Sheet3).some(([address, cell]) => /^[A-Z]+[1-9][0-9]*$/.test(address) && (cell?.f || String(cell?.v ?? '').trim())))) {
      errors.push(errorRow('Sheet3', '', '', '参考文件附带的 Sheet3 必须为空，请将问卷数据填写到指定工作表'));
    }
    if (book.SheetNames.includes('填写说明') && (!book.Sheets?.填写说明 || HEADERS.填写说明.some((value,index) => String(book.Sheets.填写说明[XLSX.utils.encode_cell({r:0,c:index})]?.v || '').trim() !== value))) {
      errors.push(errorRow('填写说明', 1, '表头', '旧版填写说明表头必须为填写项目、规则与示例'));
    }
    const data = {};
    let basicLabels = [];
    let columnOptions = false;
    SHEETS.forEach(name => {
      const headers = HEADERS[name];
      const sheet = book.Sheets[name], displayed = TEMPLATE_HEADERS[name];
      const normalizeHeader = value => String(value ?? '').trim().replace(/（/g, '(').replace(/）/g, ')');
      const fileStyle = FILE_STYLE_HEADERS[name].every((value, index) => normalizeHeader(sheet[XLSX.utils.encode_cell({r: 2, c: index})]?.v) === value);
      if (fileStyle || String(sheet.A1?.v || '').trim() === '问卷导入模板') {
        if (!fileStyle) errors.push(errorRow(name, 3, '表头', '请保留下载模板第3行表头及必填标识'));
        const metadata = name === '基本信息' ? templateMetadataCells(book) : new Set();
        metadata.add('A1'); metadata.add('A2');
        const rows = readRows(sheet, name, FILE_STYLE_HEADERS[name].length, errors, metadata);
        rows.filter(item => item.row < 3).forEach(item => errors.push(errorRow(name, item.row, '', '标题及填写须知区域仅允许左上角填写内容')));
        const allowedMerges = name === '基本信息' ? ['A1:C1','A2:C2'] : ['A1:D1','A2:D2'];
        if ((sheet['!merges'] || []).some(range => !allowedMerges.includes(XLSX.utils.encode_range(range)))) errors.push(errorRow(name, '', '', '仅允许标题行和填写须知行合并，表头及数据行不得合并'));
        const content = rows.filter(item => item.row > 3);
        if (name === '基本信息') {
          basicLabels = ['问卷名称','问卷类型','问卷说明'];
          if (content.length > 1) errors.push(errorRow(name, content[1].row, '', '基本信息仅允许填写一行数据'));
          const entry = content[0] || {row: 4, values: []};
          data[name] = basicLabels.map((field, index) => ({row: entry.row, values: [field, entry.values[index] || '']}));
        } else {
          columnOptions = false;
          data[name] = content.map((entry, index) => ({row: entry.row, values: [String(index + 1), ...entry.values]}));
        }
        return;
      }
      const matchesHeader = expected => expected.every((value, index) => String(sheet[XLSX.utils.encode_cell({r: 0, c: index})]?.v || '').trim() === value);
      const schemas = name === '基本信息' ? [LEGACY_BASIC_HEADERS, displayed, headers] : [displayed, LEGACY_COLUMN_HEADERS, LEGACY_TEMPLATE_HEADERS, headers];
      const accepted = schemas.find(matchesHeader);
      if (name === '基本信息') {
        basicLabels = accepted?.length === 4 ? ['问卷名称（必填）','问卷类型（必填）','问卷说明（非必填）'] : accepted?.length === 3 ? ['问卷名称（必填）','问卷类型（必填）','问卷说明'] : ['问卷名称','问卷类型','问卷说明'];
      }
      if (name === '问卷内容') columnOptions = accepted?.length === 24;
      const metadata = name === '基本信息' && accepted?.length === 3 ? templateMetadataCells(book) : new Set();
      const rows = readRows(sheet, name, (accepted || headers).length, errors, metadata), header = rows.find(row => row.row === 1);
      if (!header || !accepted) errors.push(errorRow(name, 1, '表头', `请保留下载模版表头；兼容原表头：${headers.join('、')}`));
      if (book.Sheets[name]['!merges']?.length) errors.push(errorRow(name, '', '', '数据工作表不支持合并单元格'));
      data[name] = rows.filter(row => row.row > 1);
    });
    const basic = {}, allowed = ['问卷名称', '问卷类型', '问卷说明'];
    data.基本信息.forEach(({row, values}) => {
      const [displayedField, value] = values, field = BASIC_FIELD_NAMES[displayedField];
      if (!basicLabels.includes(displayedField)) {
        errors.push(errorRow('基本信息', row, '字段', '请保留当前模板基本信息字段名称及必填标识，不混用新旧字段')); return;
      }
      if (!allowed.includes(field)) { errors.push(errorRow('基本信息', row, '字段', '字段必须为问卷名称、问卷类型或问卷说明')); return; }
      if (basic[field]) { errors.push(errorRow('基本信息', row, '字段', '字段重复')); return; }
      basic[field] = {value, row};
    });
    allowed.forEach(field => { if (!basic[field]) errors.push(errorRow('基本信息', '', field, '缺少模板字段')); });
    const title = basic.问卷名称?.value || '', description = basic.问卷说明?.value || '', typeName = basic.问卷类型?.value || '';
    if (!title || title.length > 50) errors.push(errorRow('基本信息', basic.问卷名称?.row, '问卷名称', '必填，长度为 1～50 个字符'));
    if (description.length > 500) errors.push(errorRow('基本信息', basic.问卷说明?.row, '问卷说明', '最多 500 个字符'));
    const types = CONFIG[portal].surveyTypes.filter(type => type.name === typeName);
    if (!typeName || types.length !== 1) errors.push(errorRow('基本信息', basic.问卷类型?.row, '问卷类型', !typeName ? '请选择当前端有效的问卷类型名称' : types.length > 1 ? '问卷类型名称不唯一，请联系管理员' : '问卷类型不存在或已失效，请填写当前端有效名称'));
    const questions = [], numbers = new Set(), contentRows = data.问卷内容;
    if (!contentRows.length || contentRows.length > 100) errors.push(errorRow('问卷内容', '', '题量', '单份问卷必须包含 1～100 道题'));
    contentRows.forEach(({row, values}) => {
      const [numberText, type, questionTitle, requiredText, ...optionCells] = values, number = Number(numberText);
      if (!/^[1-9][0-9]*$/.test(numberText) || number > 100) errors.push(errorRow('问卷内容', row, '题号', '题号必须为 1～100 的整数'));
      else if (numbers.has(number)) errors.push(errorRow('问卷内容', row, '题号', '题号重复'));
      numbers.add(number);
      if (!TYPES.includes(type)) errors.push(errorRow('问卷内容', row, '题型', `仅支持：${TYPES.join('、')}`));
      if (!['是', '否'].includes(requiredText)) errors.push(errorRow('问卷内容', row, '是否必填', '必须填写“是”或“否”'));
      const choice = ['单选', '多选'].includes(type), optionText = optionCells[0] || '';
      const lastOption = optionCells.reduce((last, value, index) => value ? index : last, -1);
      const optionsList = columnOptions ? optionCells.slice(0, lastOption + 1) : optionText ? optionText.split(/\r\n?|\n/).map(value => value.trim()) : [];
      const problem = typeof questionValidationError === 'function' ? questionValidationError(questionTitle, type, optionsList) : '';
      if (problem) errors.push(errorRow('问卷内容', row, choice && /选项/.test(problem) ? '选项' : '题目标题', problem));
      if (choice && columnOptions) optionsList.forEach((value, index) => {
        if (!value) errors.push(errorRow('问卷内容', row, `选项${index + 1}`, '请从选项1开始连续填写，不得跳过中间选项'));
        if (/[\r\n]/.test(value)) errors.push(errorRow('问卷内容', row, `选项${index + 1}`, '每个选项单独填写一格，请将下一选项移至右侧列'));
        if (value.length > 50) errors.push(errorRow('问卷内容', row, `选项${index + 1}`, '每个选项最多50个字符'));
      });
      if (choice && !columnOptions && optionsList.some(value => !value)) errors.push(errorRow('问卷内容', row, '选项', '选项不得包含空白行'));
      if (!choice && (columnOptions ? lastOption >= 0 : optionText)) errors.push(errorRow('问卷内容', row, '选项', '非选择题的选项必须全部留空'));
      questions.push({id: `excel-row-${number}`, number, type, title: questionTitle, required: requiredText === '是',
        options: choice ? optionsList : [], imageOnly: false, includeTime: false, jumpEnabled: false, jumpRules: []});
    });
    if (contentRows.length && [...numbers].some(number => !Number.isInteger(number) || number < 1 || number > contentRows.length) || numbers.size !== contentRows.length) {
      errors.push(errorRow('问卷内容', '', '题号', '题号必须从 1 开始连续编号且不重复'));
    }
    if (errors.length) return {ok: false, errors};
    questions.sort((left, right) => left.number - right.number).forEach(question => { delete question.number; });
    const basicValue = {title, description, surveyTypeId: types[0].id, surveyTypeName: types[0].name};
    return {ok: true, errors: [], value: {...basicValue, questions}, basic: basicValue, questions};
  }
  function buildTemplateWorkbook(portal = state.portal) {
    return XLSX.read(buildTemplateBytes(portal), {type: 'array', cellStyles: true});
  }
  function buildTemplateBytes() {
    // Return the reviewed static template with the approved realistic example.
    return Uint8Array.from(atob(TEMPLATE_FILE_BASE64), character => character.charCodeAt(0));
  }
  function saveTemplateBytes(bytes) {
    const blob=new Blob([bytes],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}),url=URL.createObjectURL(blob),link=document.createElement('a');
    link.href=url;link.download='问卷调研模板.xlsx';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);return true;
  }
  function downloadTemplate() {
    if (state.preview !== 'pc') return false;
    try { saveTemplateBytes(buildTemplateBytes()); track('excel_template_download', {result: 'success', template_version:'family-school-example-v1'}); return true; }
    catch (error) { track('excel_template_download', {result: 'failed'}); toast(error.message || '模板下载失败，请重试'); return false; }
  }
  async function readFile(file, options = {}) {
    options.onProgress?.('正在读取文件');
    if (!file || !/\.(xlsx|xls)$/i.test(file.name || '')) return {ok: false, errors: [errorRow('文件', '', '', '仅支持 .xlsx、.xls 文件')]};
    if (!file.size || file.size > MAX_BYTES) return {ok: false, errors: [errorRow('文件', '', '', file.size ? '文件不能超过 5 MB' : '文件内容为空')]};
    if (typeof XLSX === 'undefined') return {ok: false, errors: [errorRow('文件', '', '', 'Excel 组件加载失败，请刷新后重试')]};
    try {
      const buffer = await file.arrayBuffer(), bytes = new Uint8Array(buffer);
      if (!bytes.length || bytes.length > MAX_BYTES) throw new Error('文件大小无效');
      const compound = bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0;
      let directory = '';
      if (compound) for (let index = 0; index < bytes.length; index += 2) directory += String.fromCharCode(bytes[index] | ((bytes[index + 1] || 0) << 8));
      if (compound && (/\.xlsx$/i.test(file.name) || /EncryptedPackage|EncryptionInfo/.test(directory))) return {ok: false, errors: [errorRow('文件', '', '', '不支持密码保护或加密文件，请解除保护后上传')]};
      const zip = bytes[0] === 0x50 && bytes[1] === 0x4b;
      const biff = bytes[0] === 0x09 && [0x00, 0x02, 0x04, 0x08].includes(bytes[1]);
      if ((!zip && !compound && !biff) || (/\.xlsx$/i.test(file.name) && !zip)) throw new Error('文件不是有效的 Excel 工作簿');
      options.onProgress?.('正在解析工作簿');
      await new Promise(resolve => requestAnimationFrame(resolve));
      if (options.cancelled?.()) return null;
      const book = XLSX.read(buffer, {type: 'array', bookVBA: true, bookFiles: true, cellFormula: true});
      options.onProgress?.('正在校验基本信息与问卷内容');
      await new Promise(resolve => requestAnimationFrame(resolve));
      if (options.cancelled?.()) return null;
      return parseWorkbook(book, options);
    } catch (error) {
      return {ok: false, errors: [errorRow('文件', '', '', /password|encrypt|FilePass/i.test(error.message || '') ? '不支持密码保护或加密文件，请解除保护后上传' : '文件读取失败，请检查文件是否损坏并使用下载模板')]};
    }
  }
  function commitDraft(result) {
    if (state.preview !== 'pc') throw new Error('请在 PC 端导入问卷');
    const value = result?.ok ? result.value : result;
    if (!value || !value.title || value.title.length > 50 || value.description?.length > 500 || !Array.isArray(value.questions) || !value.questions.length || value.questions.length > 100) throw new Error('导入内容校验未通过');
    const matches = CONFIG[state.portal].surveyTypes.filter(type => String(type.id) === String(value.surveyTypeId) && type.name === value.surveyTypeName);
    if (matches.length !== 1) throw new Error('问卷类型已失效，请重新上传文件');
    value.questions.forEach(question => { const problem = questionValidationError(question.title, question.type, question.options); if (!TYPES.includes(question.type) || problem) throw new Error(problem || '题型无效'); });
    const portal = state.portal;
    const saved = transaction(() => {
      resetCreationState();
      state.draftTitle = value.title; state.draftDescription = value.description || '';
      state.draftSurveyTypeId = String(matches[0].id); state.draftSurveyTypeName = matches[0].name;
      state.questions = typeof SurveyRouting !== 'undefined' ? SurveyRouting.cloneQuestions(value.questions, true) : cloneQuestions(value.questions);
      let id = Date.now(); while (Object.values(CONFIG).some(config => config.surveys.some(survey => survey.id === id))) id++;
      const payload = draftPayload(), survey = {id, ...payload, creationSource: 'excel', excelImportVersion: VERSION,
        owner: CONFIG[portal].user.split(' · ')[0], createdAt: formatSystemTime(), deleted: 0, status: 'draft', statusText: '草稿'};
      CONFIG[portal].surveys.unshift(survey);
      state.editingSurveyId = id; state.preserveSurveyTypeSnapshot = true; state.step = 1;
      state.page = 'list/create'; state.listView = 'published';
      return survey;
    }, true);
    creationSessionId = saved.id;
    return saved;
  }

  function renderDialog() {
    if (!dialog) return;
    const current = dialog, uploading = current.phase === 'upload', saving = current.phase === 'saving', validating = current.phase === 'validating';
    const summary = current.phase === 'ready' ? `<div class="survey-excel-success" role="status"><b>校验通过</b><br>问卷名称：${escape(current.parsed.value.title)}<br>题目数量：${current.parsed.value.questions.length} 道<br>确认导入后才创建并保存草稿；接收人员和收集设置需手动配置。</div>` : '';
    const errors = current.errors.length ? `<div class="survey-excel-errors" role="alert"><b>共 ${current.errors.length} 项问题，本次未创建草稿</b><div class="survey-excel-error-table"><table><thead><tr><th>页面（工作表）</th><th>第几行</th><th>问题原因</th></tr></thead><tbody>${current.errors.map(error => `<tr><td>${escape(error.sheet)}</td><td>${escape(error.row || '—')}</td><td>${escape([error.column || error.field, error.message || error.reason].filter(Boolean).join('：'))}</td></tr>`).join('')}</tbody></table></div></div>` : '';
    const uploadBody = `<button type="button" class="btn" data-excel-download>下载模版</button><label class="survey-excel-upload"><input type="file" accept=".xlsx,.xls" data-excel-file><strong>${current.file ? escape(current.file.name) : '点击选择 Excel 文件'}</strong><span>${current.file ? `${(current.file.size / 1024).toFixed(1)} KB · 可点击重新选择` : '支持 .xlsx、.xls，文件不超过 5 MB'}</span></label><p class="survey-excel-note">选择文件后点击“开始导入”进行完整校验。导入成功后进入第 1 步，日期时分、仅图片和选项跳转可在问卷设计中继续设置。</p>`;
    const resultBody = `<div class="survey-excel-file-info"><span>导入文件</span><strong>${escape(current.file?.name || '')}</strong></div><div class="survey-excel-progress" role="status" aria-live="polite"><div><b>${escape(current.stage)}</b><span>${validating || saving ? '处理中' : '100%'}</span></div><progress ${validating || saving ? '' : 'value="100"'} max="100" aria-label="导入处理进度"></progress></div>${validating ? '<p class="survey-excel-note">正在读取、解析并校验文件；校验完成后需确认导入。本阶段可取消，不创建草稿。</p>' : ''}${summary}${errors}`;
    const action = uploading ? `<button type="button" class="btn primary" data-excel-start ${current.file ? '' : 'disabled'}>开始导入</button>`
      : current.phase === 'invalid' ? '<button type="button" class="btn primary" data-excel-retry>重新导入</button>'
      : `<button type="button" class="btn primary" data-excel-confirm ${current.phase !== 'ready' ? 'disabled' : ''}>${saving ? '正在保存…' : validating ? '校验中…' : '确认导入'}</button>`;
    current.layer.innerHTML = `<section class="survey-excel-dialog" role="dialog" aria-modal="true" aria-labelledby="survey-excel-title" data-prd-overlay="excel-import" data-excel-phase="${current.phase}"><header><h2 id="survey-excel-title">Excel 导入${uploading ? '' : ' · 校验与结果'}</h2><button type="button" class="survey-excel-close" data-excel-close aria-label="关闭 Excel 导入" ${saving ? 'disabled' : ''}>×</button></header><div class="survey-excel-body">${uploading ? uploadBody : resultBody}</div><footer><button type="button" class="btn" data-excel-close ${saving ? 'disabled' : ''}>取消</button>${action}</footer></section>`;
    current.layer.querySelectorAll('[data-excel-close]').forEach(button => button.onclick = () => close('button'));
    const bind = (selector, callback) => { const button = current.layer.querySelector(selector); if (button) button.onclick = callback; };
    bind('[data-excel-download]', downloadTemplate); bind('[data-excel-start]', startImport); bind('[data-excel-retry]', retryImport); bind('[data-excel-confirm]', confirmImport);
    const input = current.layer.querySelector('[data-excel-file]'); if (input) input.onchange = event => selectFile(event.target.files?.[0]);
    if (typeof decorateOverlay === 'function') decorateOverlay(current.layer.querySelector('.survey-excel-dialog'), 'excel-import');
  }
  function open(trigger = null) {
    if (state.preview !== 'pc' || dialog) return false;
    state.createSurveyMenuOpen = false; renderShell();
    const layer = document.createElement('div'); layer.className = 'survey-excel-mask';
    dialog = {layer, trigger, file: null, parsed: null, errors: [], phase: 'upload', stage: '', busy: false, token: ++generation, context: `${state.portal}:${CONFIG[state.portal].org}:${CONFIG[state.portal].user}`};
    layer.onclick = event => { if (event.target === layer) close('mask'); };
    document.body.appendChild(layer); renderDialog();
    layer.querySelector('[data-excel-download]')?.focus(); track('excel_import_open'); return true;
  }
  function close(method = 'button') {
    if (!dialog) return;
    if (dialog.phase === 'saving' && !['success', 'context_change'].includes(method)) return false;
    const current = dialog; dialog = null; generation++;
    current.layer.remove();
    if (method !== 'success') track('excel_import_cancel', {close_method: method});
    if (current.trigger?.isConnected) current.trigger.focus();
    else document.querySelector('[data-create-survey-menu-toggle]')?.focus();
  }
  function selectFile(file) {
    if (!dialog || dialog.phase !== 'upload' || !file) return false;
    const current = dialog;
    current.file = file; current.parsed = null; current.errors = []; renderDialog();
    track('excel_import_file_select', {file_size: file.size, file_type: String(file.name || '').split('.').pop().toLowerCase()});
    return true;
  }
  async function startImport() {
    if (!dialog || dialog.phase !== 'upload' || !dialog.file) return false;
    const current = dialog, token = ++generation, portal = state.portal;
    current.token = token; current.phase = 'validating'; current.busy = true; current.stage = '正在读取文件'; renderDialog();
    const cancelled = () => dialog !== current || current.token !== token || generation !== token;
    track('excel_import_validate_start');
    const startedAt = Date.now();
    await new Promise(resolve => requestAnimationFrame(resolve));
    if (cancelled()) return false;
    const parsed = await readFile(current.file, {portal, cancelled, onProgress(stage) { if (!cancelled()) { current.stage = stage; renderDialog(); } }});
    if (dialog !== current || current.token !== token || generation !== token) return false;
    current.busy = false; current.parsed = parsed; current.errors = parsed.errors; current.phase = parsed.ok ? 'ready' : 'invalid'; current.stage = parsed.ok ? '校验完成' : '校验失败'; renderDialog();
    track('excel_import_validate', {result: parsed.ok ? 'success' : 'failed', error_count: parsed.errors.length});
    track(parsed.ok ? 'excel_import_validate_pass' : 'excel_import_validate_fail', {error_count: parsed.errors.length, duration_ms: Date.now() - startedAt});
    return parsed;
  }
  function retryImport() {
    if (!dialog || dialog.phase !== 'invalid') return false;
    const trigger = dialog.trigger; track('excel_import_retry'); close('retry'); return open(trigger);
  }
  async function confirmImport() {
    if (!dialog || dialog.phase !== 'ready' || !dialog.parsed?.ok) return false;
    const current = dialog;
    if (current.context !== `${state.portal}:${CONFIG[state.portal]?.org}:${CONFIG[state.portal]?.user}` || state.preview !== 'pc') { close('context_change'); return false; }
    current.busy = true; current.phase = 'saving'; current.stage = '正在保存草稿'; renderDialog();
    track('excel_import_confirm_save', {question_count: current.parsed.value.questions.length});
    const startedAt = Date.now();
    try {
      await new Promise(resolve => requestAnimationFrame(resolve));
      if (dialog !== current) return false;
      const survey = commitDraft(current.parsed);
      close('success'); location.hash = 'list/create'; renderShell();
      toast('导入成功，草稿已保存'); track('excel_import_result', {result: 'success', error_code: '', error_count: 0, duration_ms: Date.now() - startedAt, survey_id: survey.id, question_count: survey.questions.length}); return survey;
    } catch (error) {
      current.busy = false; current.phase = 'invalid'; current.stage = '保存失败'; current.errors = [errorRow('保存', '', '', error.message || '草稿保存失败，请重试')]; renderDialog();
      track('excel_import_result', {result: 'failed', reason: 'save', error_code: 'save', error_count: 1, question_count: current.parsed?.value?.questions?.length || 0, duration_ms: Date.now() - startedAt}); return false;
    }
  }
  function install() {
    if (installed || typeof state === 'undefined') return;
    installed = true; restorePersisted();
    const baseCreate = createPage;
    createPage = function (...args) {
      const html = baseCreate(...args);
      return state.preview === 'pc' && creationSessionId === state.editingSurveyId && state.page === 'list/create'
        ? html.replace(/(<h[12][^>]*>)编辑问卷(<\/h[12]>)/, '$1新增问卷$2') : html;
    };
    const baseMenu = createSurveyMenu;
    createSurveyMenu = function () {
      const html = baseMenu();
      return state.preview === 'pc' ? html.replace(/(<button\b[^>]*data-create-survey-template\b[^>]*>[\s\S]*?<\/button>)/,
        '$1<button type="button" role="menuitem" data-create-survey-excel><b>Excel 导入</b></button>') : html;
    };
    const baseSave = saveDraftSurvey;
    saveDraftSurvey = function () {
      const existing = CONFIG[state.portal]?.surveys.find(survey => survey.id === state.editingSurveyId);
      return imported(existing) ? transaction(() => baseSave()) : baseSave();
    };
    installLoadAdapter();
    const baseModal = modal;
    modal = function (title, text, ok, callback, ...rest) {
      return baseModal(title, text, ok, typeof callback === 'function' ? () => Object.values(CONFIG).some(config => config.surveys.some(imported)) ? transaction(callback) : callback() : callback, ...rest);
    };
    const baseRender = renderShell;
    renderShell = function () {
      if (dialog && (state.preview !== 'pc' || dialog.context !== `${state.portal}:${CONFIG[state.portal]?.org}:${CONFIG[state.portal]?.user}`)) close('context_change');
      const result = baseRender();
      if (!transactionDepth) { try { persistAll(); } catch (error) { track('excel_draft_save_failed', {reason: 'storage'}); toast(error.message); } }
      return result;
    };
    document.addEventListener('click', event => {
      const button = event.target?.closest?.('[data-create-survey-excel]');
      if (!button) return; event.preventDefault(); event.stopImmediatePropagation(); open(button);
    }, true);
    document.addEventListener('keydown', event => {
      if (!dialog) return;
      if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); close('escape'); return; }
      if (event.key !== 'Tab') return;
      const controls = [...dialog.layer.querySelectorAll('button:not([disabled]),input:not([disabled])')], first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }, true);
    window.addEventListener('hashchange', () => { if (dialog) close('route_change'); if (location.hash !== '#list/create') creationSessionId = null; });
    if (document.documentElement?.dataset) document.documentElement.dataset.surveyExcelImport = 'v111';
  }
  window.SurveyExcelV111 = {version: VERSION, MAX_BYTES, SHEETS, HEADERS, TEMPLATE_HEADERS, FILE_STYLE_HEADERS, TYPES, parseWorkbook, parse: parseWorkbook,
    readFile, read: readFile, buildTemplateWorkbook, buildTemplateBytes, saveTemplateBytes, downloadTemplate, commitDraft, storageKey, persistAll, restorePersisted,
    open, close, selectFile, startImport, retryImport, confirmImport, install, getDialog: () => dialog};
  // Register after compatibility scripts; install after their DOMContentLoaded restores.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  else install();
  window.addEventListener('load', () => { install(); installLoadAdapter(); });
})();
